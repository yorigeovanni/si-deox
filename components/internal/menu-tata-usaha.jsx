import React, { Fragment, useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const basePath = "/app-restricted-internal/tata-usaha";

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}


export default function AppInternalMenuTataUsaha() {
    const router = useRouter();

    // STATE for modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedChildren, setSelectedChildren] = useState([]);
    const [selectedParent, setSelectedParent] = useState(null);

    const menuItems = [
        {
            name: "UNIT KEPEGAWAIAN",
            icon: "briefcase-outline",
            bgColor: "bg-indigo-500",
            route: "/kepegawaian",
            childrenMenu: [
                {
                    name: "DATA PERSONIL",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
                {
                    name: "DATA CUTI",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/cuti"
                },
                {
                    name: "DATA ABSENSI",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/absensi"
                },
                {
                    name: "DATA DIKLAT",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/diklat"
                },
                {
                    name: "DATA ABK",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/abk"
                },
            ]
        },
        {
            name: "BENDAHARA PENGELUARAN",
            icon: "cash-outline",
            bgColor: "bg-red-500",
            route: "/portal-mitra",
            childrenMenu: [
                {
                    name: "DATA PEMBAYARAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
                {
                    name: "LAPORAN PENGELUARAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
                {
                    name: "LAPORAN REKONSILIASI",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
            ]
        },
        {
            name: "BENDAHARA PENERIMAAN",
            icon: "wallet-outline",
            bgColor: "bg-green-500",
            route: "/app-restricted-internal",
            childrenMenu: [
                {
                    name: "DATA PENERIMAAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
                {
                    name: "LAPORAN PENDAPATAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
                {
                    name: "LAPORAN REKONSILIASI",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
            ]
        },
        {
            name: "PENGELOLA KEUANGAN",
            icon: "bar-chart-outline",
            bgColor: "bg-blue-500",
            route: "/app-restricted-internal",
            childrenMenu: [

            ]
        },
        {
            name: "HUBUNGAN MASYARAKAT",
            icon: "megaphone-outline",
            bgColor: "bg-emerald-500",
            route: "/humas",
            childrenMenu: [
                {
                    name: "LAPORAN PENGADUAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/pengaduan"
                },
                {
                    name: "LAPORAN TANGGAPAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/tanggapan"
                },
                {
                    name: "LAPORAN KELUHAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
                {
                    name: "BAHAN PUBLIKASI",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/publikasi"
                },
            ]
        },
        {
            name: "PERENCANAAN",
            icon: "calendar-outline",
            bgColor: "bg-amber-500",
            route: "/app-restricted-internal",
            childrenMenu: [
                {
                    name: "USULAN ANGGARAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
                {
                    name: "LAPORAN ANGGARAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
                {
                    name: "LAPORAN REALISASI",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
                {
                    name: "LAPORAN KINERJA",
                    icon: "chatbubble-outline",
                    bgColor: "bg-green-500",
                    route: "/personil"
                },
            ]
        },
        {
            name: "PPK & PPSM",
            icon: "file-tray-stacked-outline",
            bgColor: "bg-purple-500",
            route: "/app-restricted-internal",
            childrenMenu: []
        }
    ];


    const chunkedMenus = chunkArray(menuItems, 4);



    // Handler ketika user klik item parent
    const handleParentPress = useCallback((item) => {
        if (item.childrenMenu && item.childrenMenu.length > 0) {
            setSelectedParent(item);
            setSelectedChildren(item.childrenMenu);
            setModalVisible(true);
        } else {
            router.replace(`${basePath}${item.route}`);
        }
    }, []);



    const handleChildPress = useCallback((child) => {
        setModalVisible(false);
        setSelectedChildren([]);
        router.replace(`${basePath}${selectedParent.route}${child.route}`);
    }, [selectedParent]);




    const renderChildrenMenu = () => {
        const chunkedChild = chunkArray(selectedChildren, 4);
        return (
            <Fragment>
                {chunkedChild.map((row, rowIndex) => (
                    <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 12 }}>
                        {row.map((child, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{ alignItems: "center", width: "23%", marginHorizontal: 4 }}
                                onPress={() => handleChildPress(child)}
                            >
                                <View
                                    style={{
                                        justifyContent: "left",
                                        alignItems: "left",
                                        borderRadius: 9999,
                                        padding: 12,
                                        borderWidth: 1,
                                        borderColor: "#fff",
                                        // tailwind => {child.bgColor} 
                                        // Sbg ganti cepat:
                                        backgroundColor: "#0ea5e9", // default color
                                    }}
                                >
                                    <Ionicons name={child.icon} size={28} color="#ffffff" />
                                </View>
                                <Text
                                    numberOfLines={2}
                                    style={{
                                        marginTop: 4,
                                        color: "#333",
                                        fontSize: 10,
                                        textAlign: "center",
                                        maxWidth: 200,
                                    }}
                                >
                                    {child.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </Fragment>
        );
    };

    return (
        <Fragment>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8, marginTop: 16, marginLeft: 16 }}>APLIKASI OPERASIONAL & MONITORING</Text>
            {chunkedMenus.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 12 }}>
                    {row.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{ alignItems: "center", width: "23%", marginHorizontal: 4 }}
                            onPress={() => handleParentPress(item)}
                        >
                            <View
                                className={`justify-center items-center rounded-full p-4 border border-white ${item.bgColor}`}
                            >
                                <Ionicons name={item.icon} size={28} color="#ffffff" />
                            </View>
                            <Text
                                numberOfLines={2}  // up to 2 lines
                                className="mt-1 text-gray-800 text-xs text-center"
                                style={{ maxWidth: 150 }}  // atur lebar agar wrap
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}

            {Platform.OS === 'ios' ? (<Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    {/* overlay area di atas */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={() => {
                            setModalVisible(false);
                            setSelectedParent(null);
                            setSelectedChildren([]);
                        }}
                    />
                    <View
                        className="rounded-t-2xl border border-gray-300"
                        style={{
                            height: Dimensions.get("window").height * 0.4, // 30% tinggi
                            backgroundColor: "#fff",
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            padding: 16,
                        }}
                    >
                        <View className="flex-row items-center justify-between mb-6">
                            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>{selectedParent?.name}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        {renderChildrenMenu()}
                    </View>
                </View>
            </Modal>) : (<View style={{ width: "100%", height: "100%", position: "absolute" }}>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    //animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        {/* overlay area di atas */}
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            activeOpacity={1}
                            onPress={() => {
                                setModalVisible(false);
                                setSelectedParent(null);
                                setSelectedChildren([]);
                            }}
                        />
                        <View
                            className="rounded-t-2xl border border-gray-300"
                            style={{
                                height: Dimensions.get("window").height * 0.3, // 30% tinggi
                                backgroundColor: "#fff",
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16,
                                padding: 16,
                            }}
                        >
                            <View className="flex-row items-center justify-between mb-6">
                                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>{selectedParent?.name}</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Ionicons name="close" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>

                            {renderChildrenMenu()}
                        </View>
                    </View>
                </Modal>
            </View>)}





        </Fragment>
    );
}
