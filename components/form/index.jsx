import { Fragment, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { classNames } from '@/utils';
import { useRouter } from 'expo-router';
import { useCreateOrEdit } from '@/services/internal/@default-query';


import CharInput from './CharInput';
import ImageInput from './ImageInput';
import Many2OneInput from './Many2OneInput';
import SignatureInput from './SignatureInput';
import FileInput from './FileInput';
import MapsInput from './MapsInput';
import DateTimeInput from './DateTimeInput';



export default function MasterForm({
    fields = [],
    model,
    submitText = "SUBMIT"
}) {
    const router = useRouter();
    const { mutate, isError, error, isPending } = useCreateOrEdit(model);
    const defaultValues = fields
        .flat() // jadikan array 1 dimensi
        .reduce((acc, fieldConf) => {
            acc[fieldConf.name] = fieldConf.defaultValue ?? "";
            return acc;
        }, {});

    const { control, handleSubmit, reset, formState: { isValid, errors } } = useForm({
        mode: 'onChange',
        defaultValues,
    });




    const handleInternalSubmit = useCallback((formData) => {
        // create => tidak ada id
        console.log(formData);
        mutate({ data: formData },
            {
                onSuccess: () => {
                    reset();
                    router.back();
                },
                onError: (err) => {
                    console.log(err);
                }
            });
    }, [mutate, reset, router]);






    const renderFields = (fieldConf, control) => {
        switch (fieldConf.type) {
            case 'char': {
                return <CharInput control={control} {...fieldConf} />;
            }
            case 'time': {
                return <DateTimeInput control={control} {...fieldConf} />;
            }
            case 'date': {
                return <DateTimeInput control={control} {...fieldConf} />;
            }
            case 'datetime': {
                return <DateTimeInput control={control} {...fieldConf} />;
            }
            case 'image': {
                return <ImageInput control={control} {...fieldConf} />;
            }
            case 'signature': {
                return <SignatureInput control={control} {...fieldConf} />;
            }
            case 'many2one': {
                if (!fieldConf.model) {
                    return <Text>Model is required for Many2One field</Text>;
                }
                return (
                    <Many2OneInput
                        control={control}
                        {...fieldConf}
                    />
                );
            }
            default: {
                return <Text>Unknown Field Type</Text>;
            }
        }
    }



    return (
        <Fragment>
            <ScrollView className="flex-1 bg-white p-4">
            {isError && (<View className=' bg-red-100 p-4 flex-row items-center justify-center mx-6 rounded-lg mt-4'>
                <Text className='text-red-700'>{error?.response?.data?.message || error?.message}</Text>
            </View>)}

            {fields.map((rowItems, rowIndex) => (
                <View key={`row-${rowIndex}`} className="flex-row mb-4">
                    {rowItems.map((fieldConf, colIndex) => {
                        return (
                            <View
                                key={fieldConf.name}
                                className="flex-1"
                                style={{ marginRight: colIndex < rowItems.length - 1 ? 8 : 0 }}
                            >
                                {renderFields(fieldConf, control)}
                            </View>
                        );
                    })}
                </View>
            ))}

            {/* Tombol Submit */}
            <Pressable
                onPress={handleSubmit(handleInternalSubmit)}
                disabled={!isValid}
                className={classNames("bg-blue-500 py-3 rounded mt-4", !isValid ? "opacity-50" : "opacity-100")}>
                <Text className="text-white text-center font-semibold">
                    {submitText}
                </Text>
            </Pressable>
        </ScrollView>

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