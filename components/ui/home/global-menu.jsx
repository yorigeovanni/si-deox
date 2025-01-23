import { Fragment } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { classNames } from '@/utils';
import { Ionicons } from "@expo/vector-icons";
import BackGroud from '@/assets/white-pattern-indonesia-yKnkleLe.webp';
// STATE MANAGEMENT
import { useDispatch, useSelector } from 'react-redux';




export default function GlobalMenu() {
    const router = useRouter();
    const dispatch = useDispatch();

    const menu_1 = [
        { name: "PENERBANGAN", icon: "airplane-outline", bgColor: "bg-blue-500", route: "/portal-penerbangan" },
        { name: "FASILITAS", icon: "bed-outline", bgColor: "bg-green-400", route: "/portal-fasilitas" },
        { name: "PENUMPANG", icon: "person-outline", bgColor: "bg-yellow-500", route: "/portal-penumpang" },
        { name: "TRANSPORTASI", icon: "car-outline", bgColor: "bg-red-400", route: "/portal-transportasi" },
    ];

    const menu_2 = [
        { name: "PERATURAN", icon: "document-text-outline", bgColor: "bg-purple-500", route: "/portal-peraturan" },
        { name: "SOP", icon: "clipboard-outline", bgColor: "bg-pink-500", route: "/portal-sop" },
        { name: "PPID", icon: "information-circle-outline", bgColor: "bg-indigo-500", route: "/portal-ppid" },
        { name: "PENGADUAN", icon: "chatbubble-outline", bgColor: "bg-orange-400", route: "/portal-pengaduan" },
    ];
    const menu_3 = [
        { name: "STATISTIK", icon: "stats-chart-outline", bgColor: "bg-teal-500", route: "/portal-statistik" },
        { name: "LAYANAN", icon: "settings-outline", bgColor: "bg-cyan-500", route: "/portal-layanan" },
        { name: "STACKHOLDER", icon: "people-outline", bgColor: "bg-lime-500", route: "/portal-mitra" },
        { name: "INTERNAL", icon: "apps-outline", bgColor: "bg-gray-500", route: "/app-restricted-internal" },
    ];

    const menu_2x = [
        { name: "PARKIR", icon: "car-sport-outline", bgColor: "bg-blue-500", route: "/portal-parkir" },
        { name: "KULINER", icon: "fast-food-outline", bgColor: "bg-green-400", route: "/portal-kuliner" },
        { name: "BELANJA", icon: "cart-outline", bgColor: "bg-yellow-500", route: "/portal-belanja" },
        { name: "INFO", icon: "information-circle-outline", bgColor: "bg-red-400", route: "/portal-info" },
    ];

    const menu_3x = [
        { name: "KEAMANAN", icon: "shield-checkmark-outline", bgColor: "bg-blue-500", route: "/portal-keamanan" },
        { name: "KESEHATAN", icon: "medkit-outline", bgColor: "bg-green-400", route: "/portal-kesehatan" },
        { name: "KEBERSIHAN", icon: "trash-outline", bgColor: "bg-yellow-500", route: "/portal-kebersihan" },
        { name: "KESELAMATAN", icon: "alert-circle-outline", bgColor: "bg-red-400", route: "/portal-keselamatan" },
    ]

    const menu_4 = [
        { name: "PENGUMUMAN", icon: "megaphone-outline", bgColor: "bg-blue-500", route: "/portal-pengumuman" },
        { name: "BERITA", icon: "newspaper-outline", bgColor: "bg-green-400", route: "/portal-berita" },
        { name: "AGENDA", icon: "calendar-outline", bgColor: "bg-yellow-500", route: "/portal-agenda" },
        { name: "GALERI", icon: "images-outline", bgColor: "bg-red-400", route: "/portal-galeri" },
    ]

    const menu_5 = [
        { name: "PROMO", icon: "pricetags-outline", bgColor: "bg-blue-500", route: "/portal-promo" },
        { name: "EVENT", icon: "calendar-outline", bgColor: "bg-green-400", route: "/portal-event" },
        { name: "LOKASI", icon: "location-outline", bgColor: "bg-yellow-500", route: "/portal-lokasi" },
        { name: "KONTAK", icon: "call-outline", bgColor: "bg-red-400", route: "/portal-kontak" },
    ];

    const menu_6 = [
        { name: "PROMO", icon: "pricetags-outline", bgColor: "bg-blue-500", route: "/portal-promo" },
        { name: "EVENT", icon: "calendar-outline", bgColor: "bg-green-400", route: "/portal-event" },
        { name: "LOKASI", icon: "location-outline", bgColor: "bg-yellow-500", route: "/portal-lokasi" },
        { name: "KONTAK", icon: "call-outline", bgColor: "bg-red-400", route: "/portal-kontak" },
    ]



    return (<Fragment>
        <ImageBackground source={BackGroud} resizeMode="cover">

            <View className="flex-row justify-around mt-6">
                {menu_1.map((item, index) => (
                    <TouchableOpacity key={index} className="items-center" onPress={() => router.push(item.route)}>
                        <View className={`  bg-red-700 justify-center items-center rounded-full p-4 border border-red-800`}>
                            <Ionicons name={item.icon} size={35} color="#ffffff" />
                        </View>
                        <Text className="mt-1 text-red-700 text-sm ">{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View className="flex-row justify-around mt-4">
                {menu_2.map((item, index) => (
                    <TouchableOpacity key={index} className="items-center" onPress={() => router.push(item.route)}>
                        <View className={`  bg-red-700 justify-center items-center rounded-full p-4 border border-red-800`}>
                            <Ionicons name={item.icon} size={35} color="#ffffff" />
                        </View>
                        <Text className="mt-1 text-red-700 text-sm ">{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View className="flex-row justify-around mt-4 mb-6">
                {menu_3.map((item, index) => (
                    <TouchableOpacity key={index} className="items-center" onPress={() => router.push(item.route)}>
                        <View className={`  bg-red-700 justify-center items-center rounded-full p-4 border border-red-800`}>
                            <Ionicons name={item.icon} size={35} color="#ffffff" />
                        </View>
                        <Text className="mt-1 text-red-700 text-sm ">{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

        </ImageBackground>
    </Fragment>);
}

