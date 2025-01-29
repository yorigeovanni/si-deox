import React, { Fragment, useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const basePath = "/app-restricted-internal/tekops";


function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}


export default function AppInternalMenuTekops() {
    const router = useRouter();

    // STATE for modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedChildren, setSelectedChildren] = useState([]);
    const [selectedParent, setSelectedParent] = useState(null);

    const menuItems = [
        {
            name: "UNIT AMC",
            icon: "car-outline",
            bgColor: "bg-red-400",
            route: "/amc",
            childrenMenu: [
                {
                    name: "DASHBOARD",
                    icon: "bar-chart-outline",
                    bgColor: "bg-red-400",
                    route: "",
                },
                {
                    name: "SCHEDULED",
                    icon: "timer-outline",
                    bgColor: "bg-orange-400",
                    route: "/berjadwal",
                },
                {
                    name: "UNSCEDULED",
                    icon: "alarm-outline",
                    bgColor: "bg-cyan-400",
                    route: "/unsceduled",
                },
                {
                    name: "LOG BOOK",
                    icon: "book-outline",
                    bgColor: "bg-lime-400",
                    route: "/logbook",
                },
                {
                    name: "PERSONIL",
                    icon: "people-outline",
                    bgColor: "bg-pink-400",
                    route: "/personil",
                },
                {
                    name: "JADWAL DINAS",
                    icon: "calendar-outline",
                    bgColor: "bg-amber-400",
                    route: "/jadwaldinas",
                },
                {
                    name: "DATA DUKUNG",
                    icon: "folder-outline",
                    bgColor: "bg-indigo-400",
                    route: "/datadukung",
                },
            ],
        },
        {
            name: "UNIT ELBAN",
            icon: "airplane-outline",
            bgColor: "bg-blue-500", 
            route: "/elban",
            childrenMenu: [
                {
                    name: "FASILITAS",
                    icon: "bed-outline",
                    bgColor: "bg-pink-500",
                    route: "/fasilitas",
                },
                {
                    name: "PERALATAN",
                    icon: "construct-outline",
                    bgColor: "bg-cyan-500",
                    route: "/peralatan",
                },
                {
                    name: "PEMELIHARAAN",
                    icon: "hammer-outline",
                    bgColor: "bg-lime-500",
                    route: "/pemeliharaan",
                },
                {
                    name: "LOG BOOK",
                    icon: "book-outline",
                    bgColor: "bg-indigo-500",
                    route: "/logbook",
                },
                {
                    name: "SOP",
                    icon: "clipboard-outline",
                    bgColor: "bg-red-500",
                    route: "/sop",
                },
                {
                    name: "KERUSAKAN",
                    icon: "alert-circle-outline",
                    bgColor: "bg-orange-500",
                    route: "/kerusakan",
                },
                {
                    name: "PERBAIKAN",
                    icon: "build-outline",
                    bgColor: "bg-purple-500",
                    route: "/perbaikan",
                },
                {
                    name: "SUKU CADANG",
                    icon: "cube-outline",
                    bgColor: "bg-amber-500",
                    route: "/sukucadang",
                },
                {
                    name: "PERSONIL",
                    icon: "people-outline",
                    bgColor: "bg-emerald-500",
                    route: "/personil",
                },
                {
                    name: "PENGADAAN",
                    icon: "cart-outline",
                    bgColor: "bg-rose-500",
                    route: "/pengadaan",
                },
                {
                    name: "JADWAL DINAS",
                    icon: "calendar-outline",
                    bgColor: "bg-teal-500",
                    route: "/jadwaldinas",
                },
                {
                    name: "DATA MANAGEMENT",
                    icon: "folder-outline",
                    bgColor: "bg-fuchsia-500",
                    route: "/datamanagement",
                },
            ],
        },
        {
            name: "UNIT LISTRIK",
            icon: "flash-outline",
            bgColor: "bg-green-400",      // warna parent
            route: "/listrik",
            childrenMenu: [
                {
                    name: "FASILITAS",
                    icon: "bed-outline",
                    bgColor: "bg-blue-500",
                    route: "/fasilitas",
                },
                {
                    name: "PERALATAN",
                    icon: "construct-outline",
                    bgColor: "bg-pink-500",
                    route: "/peralatan",
                },
                {
                    name: "PEMELIHARAAN",
                    icon: "hammer-outline",
                    bgColor: "bg-lime-500",
                    route: "/listrik/pemeliharaan",
                },
                {
                    name: "LOG BOOK",
                    icon: "book-outline",
                    bgColor: "bg-indigo-500",
                    route: "/listrik/logbook",
                },
                {
                    name: "SOP",
                    icon: "clipboard-outline",
                    bgColor: "bg-red-500",
                    route: "/listrik/sop",
                },
                {
                    name: "KERUSAKAN",
                    icon: "alert-circle-outline",
                    bgColor: "bg-orange-500",
                    route: "/listrik/kerusakan",
                },
                {
                    name: "PERBAIKAN",
                    icon: "build-outline",
                    bgColor: "bg-purple-500",
                    route: "/listrik/perbaikan",
                },
                {
                    name: "SUKU CADANG",
                    icon: "cube-outline",
                    bgColor: "bg-amber-500",
                    route: "/listrik/sukucadang",
                },
                {
                    name: "PERSONIL",
                    icon: "people-outline",
                    bgColor: "bg-emerald-500",
                    route: "/listrik/personil",
                },
                {
                    name: "PENGADAAN",
                    icon: "cart-outline",
                    bgColor: "bg-rose-500",
                    route: "/listrik/pengadaan",
                },
                {
                    name: "JADWAL DINAS",
                    icon: "calendar-outline",
                    bgColor: "bg-teal-500",
                    route: "/listrik/jadwaldinas",
                },
                {
                    name: "DATA MANAGEMENT",
                    icon: "folder-outline",
                    bgColor: "bg-fuchsia-500",
                    route: "/listrik/datamanagement",
                },
            ],
        },
        {
            name: "UNIT BANGLAND",
            icon: "business-outline",
            bgColor: "bg-yellow-500",     // warna parent
            route: "/portal-bangland",
            childrenMenu: [
                {
                    name: "FASILITAS",
                    icon: "bed-outline",
                    bgColor: "bg-blue-500",
                    route: "/bangland/fasilitas",
                },
                {
                    name: "PERALATAN",
                    icon: "construct-outline",
                    bgColor: "bg-pink-500",
                    route: "/bangland/peralatan",
                },
                {
                    name: "PEMELIHARAAN",
                    icon: "hammer-outline",
                    bgColor: "bg-lime-500",
                    route: "/bangland/pemeliharaan",
                },
                {
                    name: "LOG BOOK",
                    icon: "book-outline",
                    bgColor: "bg-indigo-500",
                    route: "/bangland/logbook",
                },
                {
                    name: "SOP",
                    icon: "clipboard-outline",
                    bgColor: "bg-red-500",
                    route: "/bangland/sop",
                },
                {
                    name: "KERUSAKAN",
                    icon: "alert-circle-outline",
                    bgColor: "bg-orange-500",
                    route: "/bangland/kerusakan",
                },
                {
                    name: "PERBAIKAN",
                    icon: "build-outline",
                    bgColor: "bg-purple-500",
                    route: "/bangland/perbaikan",
                },
                {
                    name: "SUKU CADANG",
                    icon: "cube-outline",
                    bgColor: "bg-amber-500",
                    route: "/bangland/sukucadang",
                },
                {
                    name: "PERSONIL",
                    icon: "people-outline",
                    bgColor: "bg-emerald-500",
                    route: "/bangland/personil",
                },
                {
                    name: "PENGADAAN",
                    icon: "cart-outline",
                    bgColor: "bg-rose-500",
                    route: "/bangland/pengadaan",
                },
                {
                    name: "JADWAL DINAS",
                    icon: "calendar-outline",
                    bgColor: "bg-teal-500",
                    route: "/bangland/jadwaldinas",
                },
                {
                    name: "DATA MANAGEMENT",
                    icon: "folder-outline",
                    bgColor: "bg-fuchsia-500",
                    route: "/bangland/datamanagement",
                },
            ],
        },
        {
            name: "UNIT A2B",
            icon: "document-text-outline",
            bgColor: "bg-purple-500",     // warna parent
            route: "/portal-a2b",
            childrenMenu: [
                {
                    name: "FASILITAS",
                    icon: "bed-outline",
                    bgColor: "bg-blue-500",
                    route: "/a2b/fasilitas",
                },
                {
                    name: "PERALATAN",
                    icon: "construct-outline",
                    bgColor: "bg-pink-500",
                    route: "/a2b/peralatan",
                },
                {
                    name: "PEMELIHARAAN",
                    icon: "hammer-outline",
                    bgColor: "bg-lime-500",
                    route: "/a2b/pemeliharaan",
                },
                {
                    name: "LOG BOOK",
                    icon: "book-outline",
                    bgColor: "bg-indigo-500",
                    route: "/a2b/logbook",
                },
                {
                    name: "SOP",
                    icon: "clipboard-outline",
                    bgColor: "bg-red-500",
                    route: "/a2b/sop",
                },
                {
                    name: "KERUSAKAN",
                    icon: "alert-circle-outline",
                    bgColor: "bg-orange-500",
                    route: "/a2b/kerusakan",
                },
                {
                    name: "PERBAIKAN",
                    icon: "build-outline",
                    bgColor: "bg-purple-500",
                    route: "/a2b/perbaikan",
                },
                {
                    name: "SUKU CADANG",
                    icon: "cube-outline",
                    bgColor: "bg-amber-500",
                    route: "/a2b/sukucadang",
                },
                {
                    name: "PERSONIL",
                    icon: "people-outline",
                    bgColor: "bg-emerald-500",
                    route: "/a2b/personil",
                },
                {
                    name: "PENGADAAN",
                    icon: "cart-outline",
                    bgColor: "bg-rose-500",
                    route: "/a2b/pengadaan",
                },
                {
                    name: "JADWAL DINAS",
                    icon: "calendar-outline",
                    bgColor: "bg-teal-500",
                    route: "/a2b/jadwaldinas",
                },
                {
                    name: "DATA MANAGEMENT",
                    icon: "folder-outline",
                    bgColor: "bg-fuchsia-500",
                    route: "/a2b/datamanagement",
                },
            ],
        },
        
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
