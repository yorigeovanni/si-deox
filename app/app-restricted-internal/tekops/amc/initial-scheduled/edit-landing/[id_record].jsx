import { Fragment, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useFindOne } from '@/services/internal/@default-query';
import { useQueryClient } from '@tanstack/react-query';
import InternalHeader from '@/components/internal/header';
import MasterForm from '@/components/internal/form';


const model = 'x_data_amc';
const selectedFields = {
  x_studio_sequence: {},
  x_studio_reg_number: {},
  x_studio_operator: { fields: { x_name: {} } },
  x_studio_type_pesawat: { fields: { x_name: {} } },
  x_studio_status: {},
  x_studio_sta: {},
  x_studio_ata: {},
  x_studio_atd: {},
  x_studio_type_penerbangan: {},
  x_studio_block_on: {},
  x_studio_block_off: {},
  x_studio_parking_stand: { fields: { display_name: {} } }
};




export default function EditLanding() {
  const { id_record } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useFindOne({
   model : model,
   domain : [['id', '=', id_record]],
   fields : selectedFields
  });


  const formFields = useMemo(()=>{
    if(!data){
      return [];
    }
    const fields =  [
        [
            {
                name: 'x_studio_sta',
                label: 'SCEDULE TIME ARRIVAL',
                placeholder: 'SCEDULE TIME ARRIVAL',
                type: 'datetime',
                defaultValue: data.x_studio_sta,
                rules: {
                    required: 'field is required'
                }
            },
            {
                name: 'x_studio_ata',
                label: 'ACTUAL TIME ARRIVAL',
                placeholder: 'ACTUAL TIME ARRIVAL',
                type: 'datetime',
                defaultValue: data.x_studio_ata,
                rules: {
                    required: 'field is required'
                }
            }
        ],
        [
            {
                name: 'x_studio_type_pesawat',
                label: 'TYPE AIRCRAFT',
                placeholder: 'TYPE AIRCRAFT',
                type: 'many2one',
                model : 'x_data_type_pesawat',
                optionValue :'id',
                optionLabel : 'x_name',
                fields:{
                    x_name: {}
                },
                defaultValue: data.x_studio_type_pesawat,
                rules: {
                    required: 'field is required'
                }
            },
            {
                name: 'x_studio_operator',
                label: 'OPERATOR',
                placeholder: 'TYPE AIRCRAFT',
                type: 'many2one',
                model : 'x_data_operator',
                optionValue :'id',
                optionLabel : 'x_name',
                fields:{
                    x_name: {}
                },
                defaultValue: null,
                rules: {
                    required: 'field is required'
                }
            },
           
        ]
    ];
    console.log(fields)
    return fields;
  },[data]);




  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }


  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-600">Terjadi Error: {error?.message}</Text>
      </View>
    );
  }

  console.log(data);


  return (
   <Fragment>
               <InternalHeader
                   isBack={true}
                   title={`UPDATE LANDING `}
                   subtitle={`DATA MOVEMENT AMC - ${data.id}`}
               />
               <MasterForm
                   model={model}
                   fields={formFields}
               />
   
           </Fragment>
  );
}
