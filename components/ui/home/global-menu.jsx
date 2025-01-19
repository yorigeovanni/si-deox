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



    return (<Fragment>
        <ImageBackground source={BackGroud} resizeMode="cover">

            <View className="flex-row justify-around mt-6">
                {[
                    { name: "PENERBANGAN", icon: "airplane-outline", bgColor: "bg-blue-500", route: "/penerbangan" },
                    { name: "FASILITAS", icon: "bed-outline", bgColor: "bg-green-400", route: "/fasilitas" },
                    { name: "PENUMPANG", icon: "person-outline", bgColor: "bg-yellow-500", route: "/penumpang" },
                    { name: "TRANSPORTASI", icon: "car-outline", bgColor: "bg-red-400", route: "/transportasi" },
                ].map((item, index) => (
                    <TouchableOpacity key={index} className="items-center" onPress={() => router.push(item.route)}>
                        <View className={`  bg-red-700 justify-center items-center rounded-full p-4 border border-red-800`}>
                            <Ionicons name={item.icon} size={35} color="#ffffff" />
                        </View>
                        <Text className="mt-1 text-red-700 text-sm ">{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View className="flex-row justify-around mt-4">
                {[
                    { name: "PERATURAN", icon: "document-text-outline", bgColor: "bg-purple-500", route: "/peraturan" },
                    { name: "SOP", icon: "clipboard-outline", bgColor: "bg-pink-500", route: "/sop" },
                    { name: "PPID", icon: "information-circle-outline", bgColor: "bg-indigo-500", route: "/ppid" },
                    { name: "PENGADUAN", icon: "chatbubble-outline", bgColor: "bg-orange-400", route: "/pengaduan" },
                ].map((item, index) => (
                    <TouchableOpacity key={index} className="items-center" onPress={() => router.push(item.route)}>
                        <View className={`  bg-red-700 justify-center items-center rounded-full p-4 border border-red-800`}>
                            <Ionicons name={item.icon} size={35} color="#ffffff" />
                        </View>
                        <Text className="mt-1 text-red-700 text-sm ">{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View className="flex-row justify-around mt-4 mb-6">
                {[
                    { name: "STATISTIK", icon: "stats-chart-outline", bgColor: "bg-teal-500", route: "/statistik" },
                    { name: "LAYANAN", icon: "settings-outline", bgColor: "bg-cyan-500", route: "/layanan" },
                    { name: "STACKHOLDER", icon: "people-outline", bgColor: "bg-lime-500", route: "/mitra" },
                    { name: "APLIKASI", icon: "apps-outline", bgColor: "bg-gray-500", route: "/aplikasi" },
                ].map((item, index) => (
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

