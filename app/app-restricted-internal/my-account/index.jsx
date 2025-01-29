import React, { Fragment, useCallback, useRef } from 'react';
import { View, Text, Pressable, Image, ScrollView, Dimensions } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { BarChart } from 'react-native-chart-kit';


import InternalHeader from '@/components/internal/header';
import { useDispatch, useSelector } from 'react-redux';
import internalUserActions from '@/state/internalUser/internalUserSlice';
import { useFindOne } from '@/services/internal/@default-query';
const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : 'http://10.8.0.2:4002';
const screenWidth = Dimensions.get('window').width;

const MyAccount = () => {
    const firstTimeRef = useRef(true);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.internalUser);
    const { data, isLoading, isError, error, refetch } = useFindOne({
        model: 'hr.employee',
        domain: [
            ["id", "=", user?.id]
        ],
        fields: {
            "active": {},
            "image_128": {},
            "company_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "last_activity_time": {},
            "last_activity": {},
            "work_contact_id": {
                "fields": {}
            },
            "document_count": {},
            "has_slots": {},
            "has_subscribed_courses": {},
            "courses_completion_text": {},
            "equipment_count": {},
            "employee_cars_count": {},
            "avatar_128": {},
            "name": {},
            "job_title": {},
            "category_ids": {
                "fields": {
                    "display_name": {},
                    "color": {}
                }
            },
            "image_1920": {},
            "write_date": {},
            "mobile_phone": {},
            "work_phone": {},
            "work_email": {},
            "x_studio_nik_nip": {},
            "company_country_id": {
                "fields": {}
            },
            "company_country_code": {},
            "department_id": {
                "fields": {
                    "name": {},
                    "display_name": {}
                }
            },
            "job_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "parent_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "coach_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "employee_properties": {},
            "resume_line_ids": {
                "fields": {
                    "line_type_id": {
                        "fields": {
                            "display_name": {}
                        }
                    },
                    "course_url": {},
                    "name": {},
                    "description": {},
                    "date_start": {},
                    "date_end": {},
                    "display_type": {}
                },
                "limit": 40,
                "order": ""
            },
            "employee_skill_ids": {
                "fields": {
                    "skill_id": {
                        "fields": {
                            "display_name": {}
                        }
                    },
                    "skill_level_id": {
                        "fields": {
                            "display_name": {}
                        }
                    },
                    "level_progress": {},
                    "skill_type_id": {
                        "fields": {
                            "display_name": {}
                        }
                    },
                    "employee_id": {
                        "fields": {}
                    }
                },
                "limit": 40,
                "order": ""
            },
            "address_id": {
                "fields": {
                    "display_name": {}
                },
                "context": {
                    "show_address": 1
                }
            },
            "work_location_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "departure_reason_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "departure_description": {},
            "departure_date": {},
            "resource_calendar_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "id": {},
            "tz": {},
            "planning_role_ids": {
                "fields": {
                    "display_name": {},
                    "color": {}
                }
            },
            "default_planning_role_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "child_ids": {
                "fields": {}
            },
            "has_badges": {},
            "badge_ids": {
                "fields": {
                    "badge_name": {},
                    "badge_id": {
                        "fields": {
                            "display_name": {}
                        }
                    },
                    "user_id": {
                        "fields": {
                            "display_name": {}
                        }
                    },
                    "comment": {},
                    "create_date": {},
                    "write_date": {},
                    "create_uid": {
                        "fields": {
                            "display_name": {}
                        }
                    }
                },
                "limit": 40,
                "order": ""
            },
            "private_street": {},
            "private_street2": {},
            "private_city": {},
            "private_state_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "private_zip": {},
            "private_country_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "private_email": {},
            "private_phone": {},
            "x_studio_agama": {},
            "bank_account_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "lang": {},
            "km_home_work": {},
            "private_car_plate": {},
            "x_studio_hobi": {},
            "marital": {},
            "spouse_complete_name": {},
            "spouse_birthdate": {},
            "children": {},
            "emergency_contact": {},
            "emergency_phone": {},
            "x_studio_certificate_level": {},
            "study_field": {},
            "study_school": {},
            "visa_no": {},
            "permit_no": {},
            "visa_expire": {},
            "work_permit_expiration_date": {},
            "work_permit_name": {},
            "has_work_permit": {},
            "country_id": {
                "fields": {
                    "display_name": {}
                }
            },
            "identification_id": {},
            "ssnid": {},
            "passport_id": {},
            "gender": {},
            "birthday": {},
            "place_of_birth": {},
            "country_of_birth": {
                "fields": {
                    "display_name": {}
                }
            },
            "x_studio_nip_1": {},
            "x_studio_nomor_kartu_pegawai": {},
            "x_studio_nomor_kariskarsu": {},
            "x_studio_nomor_npwp": {},
            "x_studio_tinggi_badan_cm": {},
            "x_studio_berat_badan_kg": {},
            "x_studio_selection_field_3ge_1i438q7s4": {},
            "x_studio_bentuk_muka": {},
            "x_studio_model_rambut": {},
            "x_studio_golongan_darah": {},
            "employee_type": {},
            "pin": {},
            "barcode": {},
            "hourly_cost": {},
            "currency_id": {
                "fields": {}
            },
            "mobility_card": {},
            "x_studio_one2many_field_91u_1i31k2jsc": {
                "fields": {
                    "x_studio_nama_kursus": {},
                    "x_studio_sequence": {},
                    "x_studio_jenis_diklatkursus": {},
                    "x_studio_jenis_kursus_sertifikat": {},
                    "x_studio_nomor_sertifikat": {},
                    "x_studio_institusi_penyelenggara": {},
                    "x_studio_tanggal": {},
                    "x_name": {},
                    "x_studio_tempat": {},
                    "x_studio_lokasi": {},
                    "write_date": {},
                    "x_studio_lama": {},
                    "x_studio_satuan_waktu": {},
                    "x_studio_jumlah_jam": {},
                    "x_studio_berkas": {},
                    "x_studio_berkas_filename": {}
                },
                "limit": 40,
                "order": "x_studio_sequence ASC, id ASC"
            },
            "x_studio_ktp": {},
            "x_studio_akta_kelahiran": {},
            "x_studio_kartu_pegawai": {},
            "x_studio_kartu_istrisuami": {},
            "x_studio_skck": {},
            "x_studio_skck_filename": {},
            "x_studio_kartu_istrisuami_filename": {},
            "x_studio_kartu_pegawai_filename": {},
            "x_studio_akta_kelahiran_filename": {},
            "x_studio_ktp_filename": {},
            "x_studio_sk_sehat": {},
            "x_studio_kartu_keluarga": {},
            "x_studio_npwp": {},
            "x_studio_taspen": {},
            "x_studio_ijazah": {},
            "x_studio_ijazah_filename": {},
            "x_studio_taspen_filename": {},
            "x_studio_npwp_filename": {},
            "x_studio_kartu_keluarga_filename": {},
            "x_studio_sk_sehat_filename": {},
            "display_name": {}
        }
    });


    // Data untuk grafik batang
    const barData = {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                data: [10, 20, 25, 30, 50, 45, 55, 40, 35, 25, 20],
            },
        ],
    };


    const logout = useCallback(() => {
        dispatch(internalUserActions.logout());
    }, [dispatch]);



    useFocusEffect(
        useCallback(() => {
            if (firstTimeRef.current) {
                firstTimeRef.current = false;
                return;
            }
            refetch();
        }, [refetch])
    );





    return (
        <View className='flex-1 bg-white'>
            <InternalHeader
                backPath='/app-restricted-internal'
                title={"DEO AIRPORT"}
                subtitle={"AKUN PERSONIL"}
            />

            <ScrollView className={`flex-1 bg-white`}>
                <View className=' flex-1 bg-white'>
                    <View className=' flex-row items-start justify-start p-4'>
                        <View>
                            <Image
                                source={{ uri: `${baseURL}/web/image?model=hr.employee&id=${data?.id}&field=avatar_128` }}
                                style={{ width: 140, height: 140, borderRadius: 10 }} />
                        </View>
                        <View className='flex-col items-start justify-start px-4 py-2'>
                            <Text className=' text-lg font-bold'> {data?.name} </Text>
                            <Text> {data?.x_studio_nik_nip} </Text>
                            <Text className=' mt-2'> {data?.department_id?.name} </Text>
                            <Text> {data?.job_id?.display_name} </Text>
                        </View>
                    </View>
                </View>


                {/** STATISTIK */}
                <Text className={`font-bold  mx-4 mt-6`}>A. STATISTIK KEHADIRAN DAN CUTI - TAHUN 2025</Text>
                <View className={`flex-row justify-around mt-2 mb-6`}>
                    <View className={`items-center`}>
                        <Text className={`text-2xl font-bold text-gray-800`}>125.89 JAM</Text>
                        <Text className={`text-sm text-gray-500`}>HADIR</Text>
                    </View>
                    <View className={`items-center`}>
                        <Text className={`text-2xl font-bold text-gray-800`}>2.768 JAM</Text>
                        <Text className={`text-sm text-gray-500`}>TERLAMBAT</Text>
                    </View>
                    <View className={`items-center`}>
                        <Text className={`text-2xl font-bold text-gray-800`}>0 JAM</Text>
                        <Text className={`text-sm text-gray-500`}>ABSEN</Text>
                    </View>
                </View>


                <View className={`flex-row justify-around mt-2 mb-6`}>
                    <View className={`items-center`}>
                        <Text className={`text-2xl font-bold text-gray-800`}>12 HARI</Text>
                        <Text className={`text-sm text-gray-500`}>CUTI SISA</Text>
                    </View>
                    <View className={`items-center`}>
                        <Text className={`text-2xl font-bold text-gray-800`}>12 HARI</Text>
                        <Text className={`text-sm text-gray-500`}>CUTI TERSEDIA</Text>
                    </View>
                    <View className={`items-center`}>
                        <Text className={`text-2xl font-bold text-gray-800`}>0 HARI</Text>
                        <Text className={`text-sm text-gray-500`}>DIGUNAKAN</Text>
                    </View>
                </View>

                <View className={`flex-row items-center mx-4`}>
                    {/* Y-Axis (dummy) */}
                    <View className={`justify-between h-56 py-2`}>
                        <Text className={`text-xs text-gray-800 text-right`}>500 JAM</Text>
                        <Text className={`text-xs text-gray-800 text-right`}>200 JAM</Text>
                        <Text className={`text-xs text-gray-800 text-right`}>100 JAM</Text>
                        <Text className={`text-xs text-gray-800 text-right`}>10 JAM</Text>
                        <Text className={`text-xs text-gray-800 text-right`}>0 JAM</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <BarChart
                            data={barData}
                            width={screenWidth * 1.5}
                            height={220}
                            yAxisLabel="$"
                            yAxisSuffix="M"
                            chartConfig={{
                                backgroundColor: '#ffffff',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                barPercentage: 0.5,
                            }}
                            className={`ml-2 rounded-xl`}
                        />
                    </ScrollView>
                </View>


            </ScrollView>

            <View className=' h-20 border-t border-slate-200 bg-slate-100 flex-row items-center justify-between px-4'>

                <Pressable onPress={() => logout()} className='ml-4'>
                    <Text> LOG OUT </Text>
                </Pressable>
                <Pressable onPress={() => logout()} className='mr-4 bg-red-700 p-2 rounded-lg'>
                    <Text className=' text-white'> LOG OUT </Text>
                </Pressable>
            </View>

        </View>
    );
};



export default MyAccount;