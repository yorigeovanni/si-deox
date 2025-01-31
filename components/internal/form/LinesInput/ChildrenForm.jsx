import { Fragment, useCallback, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { classNames } from '@/utils';
import { useRouter } from 'expo-router';



import CharInput from '@/components/internal/form/CharInput';
import ImageInput from '@/components/internal/form/ImageInput';
import LinesInput from '@/components/internal/form/LinesInput';
import Many2OneInput from '@/components/internal/form/Many2OneInput';
import SignatureInput from '@/components/internal/form/SignatureInput';
import FileInput from '@/components/internal/form/FileInput';
import MapsInput from '@/components/internal/form/MapsInput';
import DateTimeInput from '@/components/internal/form/DateTimeInput';

dayjs.extend(utc);




export default function InternalMasterForm({
    value = null,
    fields = [],
    injectValues = {},
    model,
    submitText = "SUBMIT",
    onSubmit,
    onCancel,
}) {
   
    const defaultValues = fields
        .flat() // jadikan array 1 dimensi
        .reduce((acc, fieldConf) => {
            //console.log('===========================================');
            //console.log(value?.[fieldConf.name]);
            //console.log('===========================================');
            acc[fieldConf.name] = value ? value[fieldConf.name] ? value[fieldConf.name] : fieldConf.defaultValue ? fieldConf.defaultValue : null : fieldConf.defaultValue ? fieldConf.defaultValue : null;
            return acc;
        }, {});


    const { control, handleSubmit, reset, formState: { isValid, errors } } = useForm({
        mode: 'onChange',
        defaultValues,
    });



    const handleInternalSubmit = useCallback((formData) => {
        onSubmit({ ...formData, ...injectValues });
        reset();
    }, [reset, onSubmit, injectValues]);


    const handleInternalCancel = useCallback((formData) => {
        console.log(formData);
        onCancel();
        reset();
    }, [reset, onCancel]);





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
            case 'lines': {
                return <LinesInput control={control} {...fieldConf} />;
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
                return (<View className='my-2'>
                    {fieldConf.label ? <Text className=' text-gray-700'>{fieldConf.label}</Text> : null}
                    <View className='my-0'>
                        <TextInput
                            className={classNames('bg-gray-200', 'border border-gray-300 rounded p-2')}
                            placeholder={'Unknown Field Type'}
                            editable={false}
                        />
                    </View>
                </View>);
            }
        }
    }





    return (
        <Fragment>

            <ScrollView className="flex-1 bg-white p-4">


                {fields.map((rowItems, rowIndex) => {
                    return (
                        <View key={`row-${rowIndex}`} className="flex-row">
                            {rowItems.map((fieldConf, colIndex) => {
                                return (
                                    <View key={colIndex} className="flex-1" style={{ marginRight: colIndex < rowItems.length - 1 ? 8 : 0 }}>
                                        {renderFields(fieldConf, control)}
                                    </View>
                                );
                            })}
                        </View>
                    )
                })}
            </ScrollView>


            <View className='flex-row items-center justify-between py-4 px-8 bg-slate-100'>
                <Pressable
                    onPress={handleInternalCancel}
                    ///  disabled={!isValid}
                    className={classNames("bg-blue-700 p-2 rounded-lg", false ? "opacity-50" : "opacity-100")}>
                    <Text className="text-white text-center font-semibold">
                        CANCEL
                    </Text>
                </Pressable>
                <Pressable
                    onPress={handleSubmit(handleInternalSubmit)}
                    //   disabled={!isValid}
                    className={classNames("bg-green-700 p-2 rounded-lg", false ? "opacity-50" : "opacity-100")}>
                    <Text className="text-white text-center font-semibold">
                        {submitText}
                    </Text>
                </Pressable>

            </View>


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