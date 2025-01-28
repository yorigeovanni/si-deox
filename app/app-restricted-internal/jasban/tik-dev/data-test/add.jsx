import { Fragment, useCallback, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import InternalHeader from '@/components/ui/internal/header';
import MasterForm from '@/components/form';



export default () => {
    const router = useRouter();
    const model = 'x_mobile_dummy';
    const fields = [
        [
            {
                name: 'x_name',
                label: 'Name',
                placeholder: 'Nama Pekerja',
                type: 'char',
                defaultValue: '',
                rules: {
                    required: 'field is required'
                }
            }
        ],
        [
           /* {
                name: 'x_studio_integer',
                type: 'integer',
                defaultValue: 13,
                label: 'INTEGER',
                rules:{}
            },*/
            {
                name: 'x_studio_text',
                type: 'char',
                defaultValue: null,
                label: 'TEXCT '
            },
        ],
        [
            {
                name: 'x_studio_image',
                type: 'image',
                defaultValue: null,
                label: 'GAMBAR'
            },
        ],
        [
            {
                name: 'x_studio_anak',
                type: 'lines',
                defaultValue: [],
                label: 'ANAK RELATION',
                formFiels: [
                    {
                        name: 'x_name',
                        label: 'Name',
                        placeholder: 'Nama Pekerja',
                        type: 'char',
                        tableColWidth: 180,
                        defaultValue: '',
                        rules: {
                            required: 'field is required'
                        },
                        headerClasname: 'text-left text-sm text-gray-700 w-28',
                        className: 'text-left text-sm text-gray-700 w-28',
                        render: (row, value) => value
                    },
                    {
                        name: 'x_studio_potar',
                        label: 'POTAR',
                        placeholder: 'PORAT EE',
                        type: 'char',
                        tableColWidth: 180,
                        defaultValue: '',
                        rules: {
                            required: 'field is required'
                        },
                        headerClasname: 'text-left text-sm text-gray-700 w-28',
                        className: 'text-left text-sm text-gray-700 w-28',
                        render: (row, value) => value
                    },
                ]
            },
        ]
    ];




    return (
        <Fragment>
            <InternalHeader
                isBack={true}
                title='JASBAN - TIK'
                subtitle='TIK & DEV'
            />
            <MasterForm
                model={model}
                fields={fields}
            />

        </Fragment>

    );
}
