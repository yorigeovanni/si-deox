import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PortalForm from '@/components/portal/form';
import { useRouter } from "expo-router";






const PpidFormPermohonan = () => {
    const router = useRouter();
    const { phoneNumber } = useSelector((state) => state.globalOtp);
    const model = 'x_mobile_ppid';
    const fields = [
        [
            {
                name: 'x_studio_nama',
                label: 'NAMA LENGKAP',
                placeholder: 'Nama Lengkap Pemohon',
                type: 'char',
                defaultValue: '',
                rules: {
                    required: 'field is required'
                }
            },
            {
                name: 'x_studio_no_hp',
                label: 'NOMOR HANDPHONE',
                placeholder: 'No. HP',
                type: 'char',
                defaultValue: phoneNumber,
                editable: false,
                rules: {
                    required: 'field is required'
                }
            }
        ],
        [

            {
                name: 'x_studio_pekerjaan',
                label: 'PEKERJAAN',
                placeholder: 'Pekerjaan',
                type: 'char',
                defaultValue: '',
                rules: {
                    required: 'field is required'
                }
            },
            {
                name: 'x_studio_no_npwp',
                label: 'NOMOR NPWP',
                placeholder: 'No. NPWP',
                type: 'char',
                defaultValue: '',
                rules: {
                    required: 'field is required'
                }
            }
        ],
        [

            {
                name: 'x_studio_informasi_dibutuhkan',
                label: 'RINCIAN INFORMASI YANG DIBUTUHKAN',
                placeholder: 'Pekerjaan',
                type: 'char',
                defaultValue: '',
                rules: {
                    required: 'field is required'
                }
            }
        ],
        [
            {
                name: 'x_studio_tujuan_penggunaan',
                label: 'TUJUAN PENGGUNAAN INFORMASI',
                placeholder: 'Pekerjaan',
                type: 'char',
                defaultValue: '',
                rules: {
                    required: 'field is required'
                }
            }
        ],
        [
            {
                name: 'x_studio_cara_memperoleh',
                label: 'CARA MEMPEROLEH INFORMASI',
                placeholder: 'Pekerjaan',
                type: 'char',
                defaultValue: '',
                rules: {
                    required: 'field is required'
                }
            }
        ]
    ];


    const onSubmitSuccess = useCallback((data) => {
        router.replace('/portal/ppid/permohonan-anda');
    },[router]);


    const onSubmitCancel = useCallback((data) => {
        router.back();
    },[router]);






    return (
        <View className=' flex-1 pt-2  bg-white'>

            <Text className=' mt-8 mb-4 font-bold  mx-4 items-center justify-center '> FORMULIR PERMOHONAN INFORMASI</Text>

            <PortalForm
                model={model}
                fields={fields}
                onSubmitSuccess={onSubmitSuccess}
                onSubmitCancel={onSubmitCancel}
            />
            <Text className=' p-6 items-center justify-center bg-yellow-100 text-yellow-600 rounded-md text-sm'>
                PEMBERIAN INFORMASI PEMOHON YANG TIDAK BENAR TIDAK DILANJUTKAN KE PROSES BERIKUTNYA
            </Text>
        </View>
    );
};


export default PpidFormPermohonan;