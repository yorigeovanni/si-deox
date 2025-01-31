import { Fragment, useCallback, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, ActivityIndicator, BackHandler } from 'react-native';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { classNames } from '@/utils';
import { useRouter } from 'expo-router';
import { useCreateOrEdit } from '@/services/internal/@default-query';

import CharInput from './CharInput';
import TextInputYori from './TextInput';
import ImageInput from './ImageInput';
import LinesInput from './LinesInput';
import Many2OneInput from './Many2OneInput';
import SignatureInput from './SignatureInput';
import FileInput from './FileInput';
import MapsInput from './MapsInput';
import QrCodeInput from './QrCodeInput';
import DateTimeInput from './DateTimeInput';

dayjs.extend(utc);

export default function InternalMasterForm({
    id = null,
    fields = [],
    injectValues = {},
    model,
    submitText = "SUBMIT",
    onSubmit, // untuk treeForm
    onCancel,
}) {
    const router = useRouter();
    const { mutate, isError, error, isPending } = useCreateOrEdit(model);

    // buat defaultValues dari fields
    const defaultValues = fields
        .flat()
        .reduce((acc, fieldConf) => {
            acc[fieldConf.name] = fieldConf.defaultValue ?? "";
            return acc;
        }, {});

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { isValid, errors },
        getValues
    } = useForm({
        mode: 'onChange',
        defaultValues,
    });

    // Saat user menekan Submit
    const handleInternalSubmit = useCallback((formData) => {
        // bentuk final value
        const final_value = convertValue(formData, fields);

        // gabungkan injectValues (kalau ada data lain yang mau ditambahkan)
        const clean_final_value = { ...final_value, ...injectValues };

        if (onSubmit) {
            // mode treeForm (anak), misal tidak langsung ke Odoo
            onSubmit(clean_final_value);
            reset();
            return;
        } else {
            // mode normal: submit ke Odoo
            mutate({ id, data: clean_final_value }, {
                onSuccess: () => {
                    reset();
                    router.back();
                },
                onError: (err) => {
                    console.log(err);
                }
            });
        }
    }, [
        mutate,
        reset,
        router,
        fields,
        injectValues,
        id,
        onSubmit
    ]);

    // Saat user menekan Cancel
    const handleInternalCancel = useCallback(() => {
        if (onCancel) {
            reset();
            onCancel();
        } else {
            router.back();
        }
    }, [reset, onCancel, router]);

    // Fungsi render field sesuai type
    const renderFields = (fieldConf, control) => {
        switch (fieldConf.type) {
            case 'qrCode': {
                return <QrCodeInput control={control} {...fieldConf} />;
            }
            case 'char': {
                return <CharInput control={control} {...fieldConf} />;
            }
            case 'text': {
                return <TextInputYori control={control} {...fieldConf} />;
            }
            case 'time':
            case 'date':
            case 'datetime': {
                return <DateTimeInput control={control} {...fieldConf} />;
            }
            case 'image': {
                return <ImageInput control={control} {...fieldConf} />;
            }
            case 'signature': {
                return <SignatureInput control={control} {...fieldConf} />;
            }
            case 'lines': {
                return (
                    <LinesInput
                        control={control}
                        setValue={setValue}
                        {...fieldConf}
                    />
                );
            }
            case 'many2one': {
                if (!fieldConf.model) {
                    return <Text>Model is required for Many2One field</Text>;
                }
                return <Many2OneInput control={control} {...fieldConf} />;
            }
            default: {
                return (
                    <View className='my-2'>
                        {fieldConf.label ? <Text className=' text-gray-700'>{fieldConf.label}</Text> : null}
                        <View className='my-0'>
                            <TextInput
                                className={classNames('bg-gray-200', 'border border-gray-300 rounded p-2')}
                                placeholder={'Unknown Field Type'}
                                editable={false}
                            />
                        </View>
                    </View>
                );
            }
        }
    };

    // Cegah back handler jika sedang pending
    useEffect(() => {
        const handleBackPress = () => {
            if (isPending) {
                return true;
            }
            return false;
        };
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [isPending]);

    return (
        <Fragment>
            <ScrollView className="flex-1 bg-white p-4">
                {isError && (
                    <View className=' bg-red-100 p-4 flex-row items-center justify-center mx-6 rounded-lg mt-4'>
                        <Text className='text-red-700'>
                            {error?.response?.data?.message || error?.message}
                        </Text>
                    </View>
                )}

                {fields.map((rowItems, rowIndex) => (
                    <View key={`row-${rowIndex}`} className="flex-row">
                        {rowItems.map((fieldConf, colIndex) => (
                            <View
                                key={colIndex}
                                className="flex-1"
                                style={{ marginRight: colIndex < rowItems.length - 1 ? 8 : 0 }}
                            >
                                {renderFields(fieldConf, control)}
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>

            <View className='flex-row items-center justify-between py-4 px-8 bg-slate-100'>
                <Pressable
                    onPress={handleInternalCancel}
                    className={classNames("bg-blue-700 p-2 rounded-lg")}
                >
                    <Text className="text-white text-center font-semibold">
                        CANCEL
                    </Text>
                </Pressable>
                <Pressable
                    onPress={handleSubmit(handleInternalSubmit)}
                    className={classNames("bg-green-700 p-2 rounded-lg")}
                >
                    <Text className="text-white text-center font-semibold">
                        {submitText}
                    </Text>
                </Pressable>
            </View>

            {isPending && (
                <View style={styles.overlay}>
                    <View style={styles.overlayContent}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.overlayText}>Processing...</Text>
                    </View>
                </View>
            )}
        </Fragment>
    );
}

// -----------------------------------------------------------------------------
// convertValue: di sini kita bentuk list of commands Odoo (0,1,2)
function convertValue(formData, fields) {
    const final_value = {};

    fields
        .flat()
        .forEach((item) => {
            switch (item.type) {
                case 'lines': {
                    const fieldName = item.name;
                    const dataLines = formData[fieldName] || [];
                    // Baca juga removed lines yang disimpan di formData
                    const removedLines = formData[`${fieldName}___removedLines`] || [];

                    const lineCommands = [];

                    // 1) Baris yang masih ada di form (update atau create)
                    dataLines.forEach((line) => {
                        // Proses data child
                        const childrenVal = convertValue(line, item.formFiels);

                        if (line.odoo_id) {
                            // existing record => update
                            lineCommands.push([1, line.odoo_id, childrenVal]);
                        } else {
                            // new record => create
                            lineCommands.push([0, 0, childrenVal]);
                        }
                    });

                    // 2) Baris yang dihapus (yang punya id di Odoo)
                    removedLines.forEach((odooLineId) => {
                        if (odooLineId) {
                            lineCommands.push([2, odooLineId, false]);
                        }
                    });

                    final_value[fieldName] = lineCommands;
                    break;
                }

                case 'many2one': {
                    const value = formData[item.name];
                    if (value && typeof value === 'object' && item.optionValue in value) {
                        final_value[item.name] = value[item.optionValue];
                    } else {
                        final_value[item.name] = false; // misal tidak dipilih
                    }
                    break;
                }

                case 'datetime': {
                    const rawDate = formData[item.name];
                    if (!rawDate) {
                        final_value[item.name] = false;
                    } else {
                        const odooDatetimeString = dayjs.utc(rawDate).format("YYYY-MM-DD HH:mm:ss");
                        final_value[item.name] = odooDatetimeString;
                    }
                    break;
                }

                case 'date': {
                    const rawDate = formData[item.name];
                    if (!rawDate) {
                        final_value[item.name] = false;
                    } else {
                        const odooDateString = dayjs.utc(rawDate).format("YYYY-MM-DD");
                        final_value[item.name] = odooDateString;
                    }
                    break;
                }

                default: {
                    final_value[item.name] = formData[item.name];
                    break;
                }
            }
        });

    return final_value;
}

// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    },
    overlayContent: {
        alignItems: 'center'
    },
    overlayText: {
        marginTop: 10,
        color: '#fff'
    }
});
