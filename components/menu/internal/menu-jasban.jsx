import React, { Fragment, useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { classNames } from "@/utils";
import { useRouter } from "expo-router";
const basePath = "/app-restricted-internal/jasban";

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}


export default function AppInternalMenuJasban() {
    const router = useRouter();

    // STATE for modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedChildren, setSelectedChildren] = useState([]);
    const [selectedParent, setSelectedParent] = useState(null);

    const menuItems = [
        {
          name: "UNIT PNBP",
          icon: "cash-outline",
          bgColor: "bg-green-500",
          route: "/portal-pengaduan",
          groupRoles : [],
          childrenMenu: [
            {
              name: "PENGADUAN",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/portal-pengaduan-pengaduan",
              groupRoles : [],
            },
            {
              name: "KOMENTAR",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/portal-pengaduan-komentar",
              groupRoles : [],
            },
            {
              name: "SARAN",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/portal-pengaduan-saran",
              groupRoles : [],
            },
            {
              name: "KRITIK",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/portal-pengaduan-kritik",
              groupRoles : [],
            }
          ]
        },
        {
          name: "UNIT KERJASAMA",
          icon: "people-outline",
          bgColor: "bg-indigo-500",
          route: "/portal-statistik",
          groupRoles : [],
          childrenMenu: [
            {
              name: "PENUMPANG",
              icon: "person-outline",
              bgColor: "bg-indigo-500",
              route: "/portal-statistik-penumpang",
              groupRoles : [],
            },
            {
              name: "PENERBANGAN",
              icon: "airplane-outline",
              bgColor: "bg-indigo-500",
              route: "/portal-statistik-penerbangan",
              groupRoles : [],
            },
            {
              name: "TRANSPORTASI",
              icon: "car-outline",
              bgColor: "bg-indigo-500",
              route: "/portal-statistik-transportasi",
              groupRoles : [],
            },
            {
              name: "PENGADUAN",
              icon: "chatbubble-outline",
              bgColor: "bg-indigo-500",
              route: "/portal-statistik-pengaduan",
              groupRoles : [],
            },
            {
              name: "LAYANAN",
              icon: "settings-outline",
              bgColor: "bg-indigo-500",
              route: "/portal-statistik-layanan",
              groupRoles : [],
            }
          ]
        },
        {
          name: "UNIT INFORMASI",
          icon: "information-circle-outline",
          bgColor: "bg-yellow-500",
          route: "/portal-statistik",
          groupRoles : [],
          childrenMenu: [
            {
              name: "PENUMPANG",
              icon: "person-outline",
              bgColor: "bg-yellow-500",
              route: "/portal-statistik-penumpang",
              groupRoles : [],
            },
            {
              name: "PENERBANGAN",
              icon: "airplane-outline",
              bgColor: "bg-yellow-500",
              route: "/portal-statistik-penerbangan",
              groupRoles : [],
            },
            {
              name: "TRANSPORTASI",
              icon: "car-outline",
              bgColor: "bg-yellow-500",
              route: "/portal-statistik-transportasi",
              groupRoles : [],
            },
            {
              name: "PENGADUAN",
              icon: "chatbubble-outline",
              bgColor: "bg-yellow-500",
              route: "/portal-statistik-pengaduan",
              groupRoles : [],
            },
            {
              name: "LAYANAN",
              icon: "settings-outline",
              bgColor: "bg-yellow-500",
              route: "/portal-statistik-layanan",
              groupRoles : [],
            }
          ]
        },
        {
          name: "UNIT SANITASI",
          icon: "water-outline",
          bgColor: "bg-blue-500",
          route: "/portal-statistik",
          groupRoles : [],
          childrenMenu: [
            {
              name: "PENUMPANG",
              icon: "person-outline",
              bgColor: "bg-blue-500",
              route: "/portal-statistik-penumpang",
              groupRoles : [],
            },
            {
              name: "PENERBANGAN",
              icon: "airplane-outline",
              bgColor: "bg-blue-500",
              route: "/portal-statistik-penerbangan",
              groupRoles : [],
            },
            {
              name: "TRANSPORTASI",
              icon: "car-outline",
              bgColor: "bg-blue-500",
              route: "/portal-statistik-transportasi",
              groupRoles : [],
            },
            {
              name: "PENGADUAN",
              icon: "chatbubble-outline",
              bgColor: "bg-blue-500",
              route: "/portal-statistik-pengaduan",
              groupRoles : [],
            },
            {
              name: "LAYANAN",
              icon: "settings-outline",
              bgColor: "bg-blue-500",
              route: "/portal-statistik-layanan",
              groupRoles : [],
            }
          ]
        },
        {
          name: "TATA TERMINAL",
          icon: "bus-outline",
          bgColor: "bg-orange-500",
          route: "/portal-statistik",
          childrenMenu: [
            {
              name: "PENUMPANG",
              icon: "person-outline",
              bgColor: "bg-orange-500",
              route: "/portal-statistik-penumpang"
            },
            {
              name: "PENERBANGAN",
              icon: "airplane-outline",
              bgColor: "bg-orange-500",
              route: "/portal-statistik-penerbangan"
            },
            {
              name: "TRANSPORTASI",
              icon: "car-outline",
              bgColor: "bg-orange-500",
              route: "/portal-statistik-transportasi"
            },
            {
              name: "PENGADUAN",
              icon: "chatbubble-outline",
              bgColor: "bg-orange-500",
              route: "/portal-statistik-pengaduan"
            },
            {
              name: "LAYANAN",
              icon: "settings-outline",
              bgColor: "bg-orange-500",
              route: "/portal-statistik-layanan"
            }
          ]
        },
        {
          name: "TIK - DEV",
          icon: "bus-outline",
          bgColor: "bg-orange-500",
          route: "/tik-dev",
          childrenMenu: [
            {
              name: "data-test",
              icon: "person-outline",
              bgColor: "bg-orange-500",
              route: "/data-test"
            }
          ]
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
                                <View className={classNames(child.bgColor)}
                                    style={{
                                        justifyContent: "left",
                                        alignItems: "left",
                                        borderRadius: 9999,
                                        padding: 12,
                                        borderWidth: 1,
                                        borderColor: "#fff"
                                       
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
