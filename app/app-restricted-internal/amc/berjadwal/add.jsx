import React, { useCallback, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, StyleSheet, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { classNames } from '@/utils';
import { useCreateOrEdit } from '@/services/internal/x_data_amc';


//FORM COMPONENT
import CharInput from '@/components/form/CharInput';
import Many2OneInput from '@/components/form/Many2OneInput';
import FileInput from '@/components/form/FileInput';



export default function ScheduledAdd() {
    const router = useRouter();
    const { mutate, isError, error, isPending } = useCreateOrEdit();
    const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        mode: 'onChange',
        defaultValues: {
            "x_studio_reg_number": "",
            "x_studio_operator": null,
            "x_studio_parking_stand": null,
            "x_studio_sta": null,
            "x_studio_std": null,
            "x_studio_type_pesawat": null
        }
    });

    const onSubmit = useCallback((formData) => {
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
        <View className=' flex-1 bg-white'>

            {isError && (<View className=' bg-red-100 p-4 flex-row items-center justify-center mx-6 rounded-lg mt-4'>
                <Text className='text-red-700'>{error?.response?.data?.message || error?.message}</Text>
            </View>)}

            <ScrollView className="flex-1 p-4 mt-2">
                {/** ROW 1 */}
                <View className='flex-row justify-between'>

                    <View className='flex-col w-1/2 pr-1'>
                        <Many2OneInput
                            control={control}
                            name={'x_studio_operator'}
                            model="x_data_operator"
                            fields={{
                                x_name: {}
                            }}
                            optionLabel="x_name"
                            optionValue="id"
                            domain={[]}
                            label="OPERATOR"
                        />
                    </View>

                    <View className='flex-col w-1/2 pl-1'>
                        <CharInput
                            control={control}
                            name={'x_studio_reg_number'}
                            label='REG. NUMBER'
                            placeholder='REG. NUMBER'
                        />
                    </View>
                </View>

                {/**ROW 2 */}
                <View className='flex-row justify-between mt-2'>
                    <View className='flex-col w-1/2 pr-1'>
                        <Many2OneInput
                            control={control}
                            name={'x_studio_type_pesawat'}
                            model="x_data_type_pesawat"
                            fields={{
                                x_name: {}
                            }}
                            optionLabel="x_name"
                            optionValue="id"
                            domain={[]}
                            label="AIRCRAFT TYPE"
                        />
                    </View>

                    <View className='flex-col w-1/2 pl-1'>
                        <Many2OneInput
                            control={control}
                            name={'x_studio_parking_stand'}
                            model="x_data_parking_stand"
                            fields={{
                                x_name: {}
                            }}
                            optionLabel="x_name"
                            optionValue="id"
                            domain={[]}
                            placeholder='Pilih Parking Stand ...'
                            label="PARKING STAND"
                        />
                    </View>
                </View>

                <View>
                    <FileInput
                        control={control}
                        name={'x_studio_std'}
                    />
                </View>


            </ScrollView>


            <View className=' bg-red-700 h-20 flex-row items-center justify-center'>
                <Pressable onPress={handleSubmit(onSubmit)}>
                    <Text className={classNames("text-white px-4 py-2 border rounded-md border-white/75")} >
                        SUBMIT
                    </Text>
                </Pressable>
            </View>

            {/* LOADING OVERLAY */}
            {isPending && (
                <View style={styles.overlay}>
                    <View style={styles.overlayContent}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.overlayText}>Processing...</Text>
                    </View>
                </View>
            )}
        </View>
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