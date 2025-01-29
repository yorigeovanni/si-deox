import React, { Fragment, useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const basePath = "/app-restricted-internal/kampen";

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}


export default function AppInternalMenuKampen() {
    const router = useRouter();


    const [modalVisible, setModalVisible] = useState(false);
    const [selectedChildren, setSelectedChildren] = useState([]);
    const [selectedParent, setSelectedParent] = useState(null);

    const menuItems = [
        {
            name: "KAMPEN - UNIT AVSEC",
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
            name: "KAMPEN - UNIT PKP-PK",
            icon: "information-circle-outline",
            bgColor: "bg-indigo-500",
            route: "/portal-ppid",
            childrenMenu: [
                {
                    name: "PERATURAN",
                    icon: "document-text-outline",
                    bgColor: "bg-indigo-500",
                    route: "/portal-ppid-peraturan"
                },
                {
                    name: "KEBIJAKAN",
                    icon: "document-text-outline",
                    bgColor: "bg-indigo-500",
                    route: "/portal-ppid-kebijakan"
                },
                {
                    name: "SOP",
                    icon: "clipboard-outline",
                    bgColor: "bg-indigo-500",
                    route: "/portal-ppid-sop"
                },
                {
                    name: "PPID",
                    icon: "information-circle-outline",
                    bgColor: "bg-indigo-500",
                    route: "/portal-ppid-ppid"
                }
            ]
        }
    ];

    const chunkedMenus = chunkArray(menuItems, 4);


    const handleParentPress = useCallback((item) => {
        if (item.childrenMenu && item.childrenMenu.length > 0) {
            setSelectedParent(item);
            setSelectedChildren(item.childrenMenu);
            setModalVisible(true);
        } else {
            router.replace(`${basePath}${item.route}`);
        }
    },[]);



    const handleChildPress = useCallback((child) => {
        setModalVisible(false);
        setSelectedChildren([]);
        router.replace(`${basePath}${selectedParent.route}${child.route}`);
    },[selectedParent]);




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
