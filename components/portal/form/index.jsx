import { Fragment, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { classNames } from '@/utils';
import { useRouter } from 'expo-router';
import { useCreateOrEdit } from '@/services/portal/@default-query';

//import * as fsdfsdfsdfs from  'react-hook-form';

import CharInput from './CharInput';
import ImageInput from './ImageInput';
import LinesInput from './LinesInput';
import Many2OneInput from './Many2OneInput';
import SignatureInput from './SignatureInput';
import FileInput from './FileInput';
import MapsInput from './MapsInput';
import DateTimeInput from './DateTimeInput';


//console.log(fsdfsdfsdfs)
export default function MasterForm({
    id = null,
    fields = [],
    model,
    submitText = "SUBMIT",
    onSubmitSuccess,
    onSubmitCancel

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
        console.log('sdfsfdfsdfsd')
        const final_value ={};
        fields.flat().map((item)=>{
            return {name: item.name, type : item.type}
        }).forEach((item)=>{
            if(item.type === 'lines'){
                convert_value = [];
                formData[item.name].forEach((item_lines)=>{
                    if(!id){
                        convert_value.push([0, 0, item_lines]);
                    }
                })
                final_value[item.name] = convert_value;
            }else{
                final_value[item.name] = formData[item.name];
            }
        })

        if(!id){
            console.log(final_value);
        }
         // create => tidak ada id
        mutate({ data: final_value },
            {
                onSuccess: () => {
                    reset();
                    if(onSubmitSuccess){
                        onSubmitSuccess();
                    }else{
                        router.back();
                    }
                },
                onError: (err) => {
                    console.log(err);
                }
            });
    }, [mutate, reset, router, id, onSubmitSuccess]);






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
            <ScrollView  className="flex-1 bg-white p-4">
                {isError && (<View className=' bg-red-100 p-4 flex-row items-center justify-center mx-6 rounded-lg mt-4'>
                    <Text className='text-red-700'>{error?.response?.data?.message || error?.message}</Text>
                </View>)}

                {fields.map((rowItems, rowIndex) => (
                    <View key={`row-${rowIndex}`} className="flex-row">
                        {rowItems.map((fieldConf, colIndex) => {
                            return (
                                <View key={colIndex} className="flex-1" style={{ marginRight: colIndex < rowItems.length - 1 ? 8 : 0 }}>
                                    {renderFields(fieldConf, control)}
                                </View>
                            );
                        })}
                    </View>
                ))}

                {/* Tombol Submit */}

            </ScrollView>

            <View className='flex-row items-center justify-between py-4 px-8 bg-slate-100'>
                <Pressable
                    onPress={()=> {
                        if (onSubmitCancel) {
                           return onSubmitCancel();
                        }
                    }}
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