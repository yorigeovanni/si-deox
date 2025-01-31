import { Fragment, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useFindOne } from '@/services/internal/@default-query';
import { useQueryClient } from '@tanstack/react-query';
import InternalHeader from '@/components/internal/header';
import MasterForm from '@/components/internal/form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc);
dayjs.extend(customParseFormat);

const model = 'x_data_amc';

// Fields yang diambil dari Odoo
const selectedFields = {
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
  x_studio_extra_arrivals_flight_number : {
    fields : {
      x_studio_from : { fields : { x_name : {} } },
      x_studio_destination : { fields : { x_name : {} } },
      x_studio_flight_number : {}
    }
  },
  x_studio_extra_departures_flight_number : {
    fields : {
      x_studio_from : { fields : { x_name : {} } },
      x_studio_destination : { fields : { x_name : {} } },
      x_studio_flight_number : {}
    }
  },
  x_studio_parking_stand_1: {
    fields: {
      x_studio_parking_stand_1: {
        fields: {
          x_name: {},
        }
      },
      x_studio_block_on_1: {},
      x_studio_block_off_1: {},
    }
  }
};

export default function EditLanding() {
  const { id_record } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useFindOne({
    model: model,
    domain: [['id', '=', id_record]],
    fields: selectedFields
  });

  // Helper untuk transform array lines agar punya odoo_id
  const transformLines = (arr) => {
    return (arr || []).map((line) => ({
      ...line,
      odoo_id: line.id, // simpan ID asli Odoo di property `odoo_id`
    }));
  };

  const formFields = useMemo(() => {
    if (!data) {
      return [];
    }

    // Transform lines agar masing-masing item punya `odoo_id`
    const arrivals = transformLines(data.x_studio_extra_arrivals_flight_number);
    const departures = transformLines(data.x_studio_extra_departures_flight_number);
    const parking = transformLines(data.x_studio_parking_stand_1);

    const fields = [
      [
        {
          name: 'x_studio_operator',
          label: 'OPERATOR',
          placeholder: 'OPERATOR',
          type: 'many2one',
          model: 'x_data_operator',
          optionValue: 'id',
          optionLabel: 'x_name',
          fields: {
            x_name: {}
          },
          defaultValue: data.x_studio_operator,
          rules: {
            required: 'field is required'
          }
        },
      ],
      [
        {
          name: 'x_studio_reg_number',
          label: 'REG. NUMBER',
          placeholder: 'Register Number',
          type: 'char',
          defaultValue: data.x_studio_reg_number,
          rules: {
            required: 'field is required'
          }
        },
        {
          name: 'x_studio_type_pesawat',
          label: 'AIRCRAFT TYPE',
          placeholder: 'AIRCRAFT TYPE',
          type: 'many2one',
          model: 'x_data_type_pesawat',
          optionValue: 'id',
          optionLabel: 'x_name',
          fields: {
            x_name: {}
          },
          defaultValue: data.x_studio_type_pesawat,
          rules: {
            required: 'field is required'
          }
        },
      ],
      [
        {
          name: 'x_studio_sta',
          label: 'SCEDULE TIME ARRIVAL',
          placeholder: 'STA',
          type: 'datetime',
          defaultValue: data.x_studio_sta ? new Date(data.x_studio_sta) : new Date(),
          rules: {
            required: 'field is required'
          }
        },
        {
          name: 'x_studio_std',
          label: 'SCEDULE TIME DEPARTURE',
          placeholder: 'STD',
          type: 'datetime',
          defaultValue: new Date(), // silakan sesuaikan
          rules: {
            required: 'field is required'
          }
        }
      ],
      [
        {
          name: 'x_studio_ata',
          label: 'ACTUAL TIME ARRIVAL',
          placeholder: 'ATA',
          type: 'datetime',
          defaultValue: data.x_studio_ata ? new Date(data.x_studio_ata) : new Date(),
          rules: {
            required: 'field is required'
          }
        },
        {
          name: 'x_studio_atd',
          label: 'ACTUAL TIME DEPARTURE',
          placeholder: 'ATD',
          type: 'datetime',
          defaultValue: data.x_studio_atd ? new Date(data.x_studio_atd) : new Date(),
          rules: {
            required: 'field is required'
          }
        }
      ],
      [
        {
          name: 'x_studio_extra_arrivals_flight_number',
          label: 'FLIGHT NUMBER ARRIVALS',
          placeholder: 'FLIGHT NUMBER ARRIVALS',
          type: 'lines',
          defaultValue: arrivals,  // sudah transform
          rules: {
            required: 'field is required'
          },
          formFiels: [
            [
              {
                name: 'x_studio_from',
                label: 'FROM',
                placeholder: 'FROM',
                type: 'many2one',
                model: 'x_data_airport',
                optionValue: 'id',
                optionLabel: 'x_name',
                fields: {
                  x_name: {}
                },
                defaultValue: null,
                rules: {
                  required: 'field is required'
                },
                tableColWidth: 180,
                render: (row, value) => {
                  return value?.x_name || '';
                }
              },
              {
                name: 'x_studio_destination',
                label: 'DEST',
                placeholder: 'DEST',
                type: 'many2one',
                model: 'x_data_airport',
                optionValue: 'id',
                optionLabel: 'x_name',
                fields: {
                  x_name: {}
                },
                editable: false,
                defaultValue: { id: 2, x_name: 'SOQ' },
                rules: {
                  required: 'field is required'
                },
                tableColWidth: 180,
                render: (row, value) => {
                  return value?.x_name || '';
                }
              },
            ],
            [
              {
                name: 'x_studio_flight_number',
                label: 'FLIGHT NUMBER',
                placeholder: 'FLIGHT NUMBER',
                type: 'char',
                defaultValue: '',
                rules: {
                  required: 'field is required'
                },
                tableColWidth: 180,
                render: (row, value) => {
                  return value;
                }
              },
            ]
          ],
        },
      ],
      [
        {
          name: 'x_studio_extra_departures_flight_number',
          label: 'FLIGHT NUMBER DEPARTURES',
          placeholder: 'FLIGHT NUMBER DEPARTURES',
          type: 'lines',
          defaultValue: departures,  // transform
          rules: {
            required: 'field is required'
          },
          formFiels: [
            [
              {
                name: 'x_studio_from',
                label: 'FROM',
                placeholder: 'FROM',
                type: 'many2one',
                model: 'x_data_airport',
                optionValue: 'id',
                optionLabel: 'x_name',
                editable: false,
                fields: {
                  x_name: {}
                },
                defaultValue: { id: 2, x_name: 'SOQ' },
                rules: {
                  required: 'field is required'
                },
                tableColWidth: 180,
                render: (row, value) => {
                  return value?.x_name || '';
                }
              },
              {
                name: 'x_studio_destination',
                label: 'DESTINATION',
                placeholder: 'DEST',
                type: 'many2one',
                model: 'x_data_airport',
                optionValue: 'id',
                optionLabel: 'x_name',
                fields: {
                  x_name: {}
                },
                defaultValue: null,
                rules: {
                  required: 'field is required'
                },
                tableColWidth: 180,
                render: (row, value) => {
                  return value?.x_name || '';
                }
              },
            ],
            [
              {
                name: 'x_studio_flight_number',
                label: 'FLIGHT NUMBER',
                placeholder: 'FLIGHT NUMBER',
                type: 'char',
                defaultValue: '',
                rules: {
                  required: 'field is required'
                },
                tableColWidth: 180,
                render: (row, value) => {
                  return value;
                }
              },
            ]
          ],
        },
      ],
      [
        {
          name: 'x_studio_parking_stand_1',
          label: 'BLOCK ON / BLOCK OFF',
          placeholder: 'PARKING STAND',
          type: 'lines',
          defaultValue: parking,
          rules: {
            required: 'field is required'
          },
          formFiels: [
            [
              {
                name: 'x_studio_parking_stand_1',
                label: 'PARKING STAND',
                placeholder: 'PARKING STAND',
                type: 'many2one',
                model: 'x_data_parking_stand',
                optionValue: 'id',
                optionLabel: 'x_name',
                fields: {
                  x_name: {}
                },
                defaultValue: null,
                rules: {
                  required: 'field is required'
                },
                tableColWidth: 140,
                render: (row, value) => {
                  return value?.x_name || '';
                }
              },
            ],
            [
              {
                name: 'x_studio_block_on_1',
                label: 'BLOCK ON',
                placeholder: 'BLOCK ON',
                type: 'datetime',
                defaultValue: null,
                rules: {
                  required: 'field is required'
                },
                tableColWidth: 140,
                render: (row, value) => {
                  if (!value) {
                    return '-';
                  }
                  return dayjs.utc(value, "YYYY-MM-DD HH:mm:ss").local().format("DD-MM-YYYY HH:mm");
                }
              },
              {
                name: 'x_studio_block_off_1',
                label: 'BLOCK OFF',
                placeholder: 'BLOCK OFF',
                type: 'datetime',
                defaultValue: null,
                rules: {},
                tableColWidth: 140,
                render: (row, value) => {
                  if (!value) {
                    return '-';
                  }
                  return dayjs.utc(value, "YYYY-MM-DD HH:mm:ss").local().format("DD-MM-YYYY HH:mm");
                }
              },
            ]
          ],
        },
      ],
      [
        {
          name: 'x_studio_remark',
          label: 'REMARK',
          placeholder: 'STD',
          type: 'text',
          defaultValue: data.x_studio_remark || '',
          rules: {}
        }
      ]
    ];
    return fields;
  }, [data]);

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

  return (
    <Fragment>
      <InternalHeader
        isBack={true}
        title={`UPDATE LANDING`}
        subtitle={`DATA MOVEMENT AMC - ${data.id}`}
      />
      <MasterForm
        id={data.id}  // penanda bahwa ini edit
        model={model}
        fields={formFields}
      />
    </Fragment>
  );
}
