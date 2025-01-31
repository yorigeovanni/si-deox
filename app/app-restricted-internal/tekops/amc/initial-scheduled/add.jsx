import React, { Fragment, useCallback, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import InternalHeader from '@/components/internal/header';
import MasterForm from '@/components/internal/form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc);
dayjs.extend(customParseFormat);





export default function ScheduledAdd() {
    const router = useRouter();
    const model = 'x_data_amc';
    const formFields = [
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
                defaultValue: null,
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
                defaultValue: null,
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
                defaultValue: null,
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
                defaultValue: new Date(),
                rules: {
                    required: 'field is required'
                }
            },
            {
                name: 'x_studio_std',
                label: 'SCEDULE TIME DEPARTURE',
                placeholder: 'STD',
                type: 'datetime',
                defaultValue: new Date(),
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
                defaultValue: new Date(),
                rules: {
                    required: 'field is required'
                }
            },
            {
                name: 'x_studio_atd',
                label: 'ACTUAL TIME DEPARTURE',
                placeholder: 'ATD',
                type: 'datetime',
                defaultValue: new Date(),
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
                defaultValue: [],
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
                                return value.x_name
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
                            defaultValue: {id : 2, x_name: 'SOQ'},
                            rules: {
                                required: 'field is required'
                            },
                            tableColWidth: 180,
                            render: (row, value) => {
                                return value.x_name
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
                                return value
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
                defaultValue: [],
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
                            defaultValue: {id : 2, x_name: 'SOQ'},
                            rules: {
                                required: 'field is required'
                            },
                            tableColWidth: 180,
                            render: (row, value) => {
                                console.log(value);
                                return value.x_name
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
                                console.log(value);
                                return value.x_name
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
                                return value
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
                defaultValue: [],
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
                                console.log(value);
                                return value.x_name
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
                                if(!value){
                                    return '-'
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
                                if(!value){
                                    return '-'
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
                defaultValue: null,
                rules: {}
            }
        ]
    ]



    return (
        <Fragment>
            <InternalHeader
                title='NEW DATA'
                subtitle="AMC SCHEDULE MOVEMENT"
                isBack={true}
            />
            <MasterForm
                model={model}
                fields={formFields}
                injectValues={{
                    x_studio_type_penerbangan: 'BERJADWAL'
                }}
            />
        </Fragment>
    );
}


