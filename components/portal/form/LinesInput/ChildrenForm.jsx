import { Fragment, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { classNames } from '@/utils';
import { useRouter } from 'expo-router';


import CharInput from '@/components/portal/form/CharInput';
import ImageInput from '@/components/portal/form/ImageInput';
import LinesInput from '@/components/portal/form/LinesInput';
import Many2OneInput from '@/components/portal/form/Many2OneInput';
import SignatureInput from '@/components/portal/form/SignatureInput';
import FileInput from '@/components/portal/form/FileInput';
import MapsInput from '@/components/portal/form/MapsInput';
import DateTimeInput from '@/components/portal/form/DateTimeInput';


//console.log(fsdfsdfsdfs)
export default function ChildrenForm({
    fields = [],
    onCancel,
    onSubmit,
    submitText = "SUBMIT"
}) {


    const defaultValues = fields
        .flat()
        .reduce((acc, fieldConf) => {
            acc[fieldConf.name] = fieldConf.defaultValue ?? "";
            return acc;
        }, {});

    const { control, handleSubmit, reset, formState: { isValid, errors } } = useForm({
        mode: 'onChange',
        defaultValues,
    });




    const handleInternalSubmit = useCallback((formData) => {
        console.log(formData);
        onSubmit(formData);
      //  onCancel();
    }, [reset, onSubmit]);


    const handleInternalCancel = useCallback((formData) => {
        console.log(formData);
        reset();
        onCancel();
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
                    if (Array.isArray(rowItems)) {
                        // Jika rowItems adalah array
                        return (
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
                        );
                    } else {
                        // Jika rowItems adalah object (bukan array)
                        return (
                            <View key={`row-${rowIndex}`} className="flex-row">
                                <View className="flex-1">
                                    {renderFields(rowItems, control)}
                                </View>
                            </View>
                        );
                    }
                })}
            </ScrollView>

            <View className='flex-row items-center justify-between py-4 px-8'>
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


