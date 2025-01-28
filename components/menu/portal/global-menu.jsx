import React, { Fragment, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

export default function GlobalMenu() {
    const router = useRouter();

    // STATE for modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedChildren, setSelectedChildren] = useState([]);
    const [modalTitle, setModalTitle] = useState('');

    const menuItems = [
        {
            name: "PENERBANGAN",
            icon: "airplane-outline",
            bgColor: "bg-blue-500",
            route: "/portal-penerbangan",
            childrenMenu: [
                {
                    name: "JADWAL HARI INI",
                    icon: "calendar-outline",
                    bgColor: "bg-blue-500",
                    route: "/portal-penerbangan/kedatangan"
                },
                {
                    name: "RUTE PENERBANGAN",
                    icon: "pricetag-outline",
                    bgColor: "bg-blue-500",
                    route: "/portal-penerbangan-promo"
                },
                {
                    name: "JADWAL PENERBANGAN",
                    icon: "checkmark-circle-outline",
                    bgColor: "bg-blue-500",
                    route: "/portal-penerbangan-cek-in"
                },
                {
                    name: "FGDFGDFG DFGDF",
                    icon: "checkmark-circle-outline",
                    bgColor: "bg-blue-500",
                    route: "/portal-penerbangan-cek-in"
                }
            ]
        },
        {
            name: "FASILITAS",
            icon: "bed-outline",
            bgColor: "bg-green-400",
            route: "/portal-fasilitas",
            childrenMenu: [
                {
                    name: "PARKIR",
                    icon: "car-outline",
                    bgColor: "bg-green-400",
                    route: "/portal-fasilitas-parkir"
                },
                {
                    name: "LOUNGE",
                    icon: "cafe-outline",
                    bgColor: "bg-green-400",
                    route: "/portal-fasilitas-lounge"
                },
                {
                    name: "RESTORAN",
                    icon: "restaurant-outline",
                    bgColor: "bg-green-400",
                    route: "/portal-fasilitas-restoran"
                },
                {
                    name: "TOKO",
                    icon: "cart-outline",
                    bgColor: "bg-green-400",
                    route: "/portal-fasilitas-toko"
                },
                {
                    name: "ATM",
                    icon: "card-outline",
                    bgColor: "bg-green-400",
                    route: "/portal-fasilitas-atm"
                },
                {
                    name: "PENITIPAN",
                    icon: "cube-outline",
                    bgColor: "bg-green-400",
                    route: "/portal-fasilitas-penitipan"
                }
            ]
        },
        {
            name: "PENUMPANG",
            icon: "person-outline",
            bgColor: "bg-yellow-500",
            route: "/portal-penumpang",
            childrenMenu: [
                {
                    name: "INFORMASI",
                    icon: "information-circle-outline",
                    bgColor: "bg-yellow-500",
                    route: "/portal-penumpang-informasi"
                },
                {
                    name: "KARGO",
                    icon: "cube-outline",
                    bgColor: "bg-yellow-500",
                    route: "/portal-penumpang-kargo"
                },
                {
                    name: "BAGASI",
                    icon: "briefcase-outline",
                    bgColor: "bg-yellow-500",
                    route: "/portal-penumpang-bagasi"
                },
                {
                    name: "CEK-IN",
                    icon: "checkmark-circle-outline",
                    bgColor: "bg-yellow-500",
                    route: "/portal-penumpang-cek-in"
                },
                {
                    name: "PROMO",
                    icon: "pricetag-outline",
                    bgColor: "bg-yellow-500",
                    route: "/portal-penumpang-promo"
                },
                {
                    name: "TARIF",
                    icon: "cash-outline",
                    bgColor: "bg-yellow-500",
                    route: "/portal-penumpang-tarif"
                },
                {
                    name: "JADWAL",
                    icon: "calendar-outline",
                    bgColor: "bg-yellow-500",
                    route: "/portal-penumpang-jadwal"
                }
            ]
        },
        {
            name: "TRANSPORTASI ",
            icon: "car-outline",
            bgColor: "bg-red-400",
            route: "/portal-transportasi",
            childrenMenu: [
                {
                    name: "TAXI",
                    icon: "car-outline",
                    bgColor: "bg-red-400",
                    route: "/portal-transportasi-taxi"
                },
                {
                    name: "ANGKUTAN",
                    icon: "bus-outline",
                    bgColor: "bg-red-400",
                    route: "/portal-transportasi-angkutan"
                },
                {
                    name: "PARKIR",
                    icon: "car-outline",
                    bgColor: "bg-red-400",
                    route: "/portal-transportasi-parkir"
                },
                {
                    name: "SEWA",
                    icon: "car-outline",
                    bgColor: "bg-red-400",
                    route: "/portal-transportasi-sewa"
                }
            ]
        },
        {
            name: "PERATURAN",
            icon: "document-text-outline",
            bgColor: "bg-purple-500",
            route: "/portal-peraturan",
            childrenMenu: [
                {
                    name: "PERATURAN",
                    icon: "document-text-outline",
                    bgColor: "bg-purple-500",
                    route: "/portal-peraturan-peraturan"
                },
                {
                    name: "KEBIJAKAN",
                    icon: "document-text-outline",
                    bgColor: "bg-purple-500",
                    route: "/portal-peraturan-kebijakan"
                },
                {
                    name: "SOP",
                    icon: "clipboard-outline",
                    bgColor: "bg-purple-500",
                    route: "/portal-peraturan-sop"
                },
                {
                    name: "PPID",
                    icon: "information-circle-outline",
                    bgColor: "bg-purple-500",
                    route: "/portal-peraturan-ppid"
                }
            ]
        },
        {
            name: "SOP",
            icon: "clipboard-outline",
            bgColor: "bg-pink-500",
            route: "/portal-sop",
            childrenMenu: [
                {
                    name: "PERATURAN",
                    icon: "document-text-outline",
                    bgColor: "bg-pink-500",
                    route: "/portal-sop-peraturan"
                },
                {
                    name: "KEBIJAKAN",
                    icon: "document-text-outline",
                    bgColor: "bg-pink-500",
                    route: "/portal-sop-kebijakan"
                },
                {
                    name: "SOP",
                    icon: "clipboard-outline",
                    bgColor: "bg-pink-500",
                    route: "/portal-sop-sop"
                },
                {
                    name: "PPID",
                    icon: "information-circle-outline",
                    bgColor: "bg-pink-500",
                    route: "/portal-sop-ppid"
                }
            ]
        },
        {
            name: "PPID",
            icon: "information-circle-outline",
            bgColor: "bg-indigo-500",
            route: "/portal/ppid",
            childrenMenu: []
        },
        {
            name: "PENGADUAN",
            icon: "chatbubble-outline",
            bgColor: "bg-orange-400",
            route: "/portal-pengaduan",
            childrenMenu: [
                {
                    name: "PENGADUAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-orange-400",
                    route: "/portal-pengaduan-pengaduan"
                },
                {
                    name: "KOMENTAR",
                    icon: "chatbubble-outline",
                    bgColor: "bg-orange-400",
                    route: "/portal-pengaduan-komentar"
                },
                {
                    name: "SARAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-orange-400",
                    route: "/portal-pengaduan-saran"
                },
                {
                    name: "KRITIK",
                    icon: "chatbubble-outline",
                    bgColor: "bg-orange-400",
                    route: "/portal-pengaduan-kritik"
                }
            ]
        },
        {
            name: "STATISTIK",
            icon: "stats-chart-outline",
            bgColor: "bg-teal-500",
            route: "/portal-statistik",
            childrenMenu: [
                {
                    name: "PENUMPANG",
                    icon: "person-outline",
                    bgColor: "bg-teal-500",
                    route: "/portal-statistik-penumpang"
                },
                {
                    name: "PENERBANGAN",
                    icon: "airplane-outline",
                    bgColor: "bg-teal-500",
                    route: "/portal-statistik-penerbangan"
                },
                {
                    name: "TRANSPORTASI",
                    icon: "car-outline",
                    bgColor: "bg-teal-500",
                    route: "/portal-statistik-transportasi"
                },
                {
                    name: "PENGADUAN",
                    icon: "chatbubble-outline",
                    bgColor: "bg-teal-500",
                    route: "/portal-statistik-pengaduan"
                },
                {
                    name: "LAYANAN",
                    icon: "settings-outline",
                    bgColor: "bg-teal-500",
                    route: "/portal-statistik-layanan"
                },
            ]
        },
        {
            name: "LAYANAN",
            icon: "settings-outline",
            bgColor: "bg-cyan-500",
            route: "/portal-layanan",
            childrenMenu: []
        },
        {
            name: "STACKHOLDER",
            icon: "people-outline",
            bgColor: "bg-lime-500",
            route: "/app-restricted-external",
            childrenMenu: []
        },
        {
            name: "INTERNAL",
            icon: "apps-outline",
            bgColor: "bg-gray-500",
            route: "/app-restricted-internal",
            childrenMenu: []
        },
    ];

    const chunkedMenus = chunkArray(menuItems, 4);



    // Handler ketika user klik item parent
    const handleParentPress = (item) => {
        if (item.childrenMenu && item.childrenMenu.length > 0) {
            setModalTitle(item.name);
            setSelectedChildren(item.childrenMenu);
            setModalVisible(true);
        } else {
            router.push(item.route);
        }
    };



    const handleChildPress = (child) => {
        setModalVisible(false);        // close modal
        setSelectedChildren([]);       // reset
        router.push(child.route);      // navigate
    };




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
            {/* Render parent menus */}
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
                //animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: "flex-end"  , backgroundColor: 'rgba(0,0,0,0.3)'}}>
                    {/* overlay area di atas */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={() => {
                            setModalVisible(false);
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
                            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>{modalTitle}</Text>
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
                <View style={{ flex: 1, justifyContent: "flex-end"  , backgroundColor: 'rgba(0,0,0,0.3)'}}>
                    {/* overlay area di atas */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={() => {
                            setModalVisible(false);
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
                            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>{modalTitle}</Text>
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
