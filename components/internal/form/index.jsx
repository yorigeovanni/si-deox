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
import DateTimeInput from './DateTimeInput';
dayjs.extend(utc);



const convertValue = (formData, fields) => {
    const final_value = {};
    fields.flat().map((item) => {
        return item;
    }).forEach((item) => {
        switch (item.type) {
            case 'lines':{
                const convert_value = [];
                formData[item.name].forEach((item_lines) => {
                    const convertValueChildren = convertValue(item_lines, item.formFiels);
                    //if (!id) {
                        convert_value.push([0, 0, convertValueChildren]);
                    //}
                })
                final_value[item.name] = convert_value;
                break;
            }
            case 'many2one':{
                final_value[item.name] = formData[item.name][item.optionValue];
                break;
            }
            case 'datetime':{
                const odooDatetimeString = dayjs.utc(formData[item.name]).format("YYYY-MM-DD HH:mm:ss");
                final_value[item.name] = odooDatetimeString;
                break;
            }
            default:{
                final_value[item.name] = formData[item.name];
            }
        }
    });
    return final_value;
}





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
        const final_value = convertValue(formData, fields);
        const clean_final_value = { ...final_value, ...injectValues };
        if (!id) {
            console.log(clean_final_value);
        }
        if(onSubmit){
            onSubmit(clean_final_value);
            reset();
            return;
        }else{
            mutate({ data: clean_final_value },
                {
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


    const handleInternalCancel = useCallback((formData) => {
        if(onCancel){
            reset();
            onCancel();
        }else{
            router.back();
        }
    }, [reset, onCancel, router]);






    const renderFields = (fieldConf, control) => {
        switch (fieldConf.type) {
            case 'char': {
                return <CharInput control={control} {...fieldConf} />;
            }
            case 'text': {
                return <TextInputYori control={control} {...fieldConf} />;
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
                {isError && (<View className=' bg-red-100 p-4 flex-row items-center justify-center mx-6 rounded-lg mt-4'>
                    <Text className='text-red-700'>{error?.response?.data?.message || error?.message}</Text>
                </View>)}

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