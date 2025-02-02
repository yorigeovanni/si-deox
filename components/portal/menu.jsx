import React, { Fragment, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions, Platform , Image} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BluLogo from '@/assets/blu.png';
import PerhubunganLogo from '@/assets/deo.jpg';



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
            bgColor: "bg-blue-700",
            route: "/portal-penerbangan",
            childrenMenu: []
        },
        {
            name: "FASILITAS",
            icon: "bed-outline",
            bgColor: "bg-green-700",
            route: "/portal/fasilitas",
            childrenMenu: []
        },
        {
            name: "PENUMPANG",
            icon: "person-outline",
            bgColor: "bg-yellow-600",
            route: "/portal/penumpang",
            childrenMenu: []
        },
        {
            name: "TRANSPORTASI ",
            icon: "car-outline",
            bgColor: "bg-red-600",
            route: "/portal/transportasi",
            childrenMenu: []
        },
        {
            name: "PERATURAN",
            icon: "document-text-outline",
            bgColor: "bg-purple-700",
            route: "/portal/peraturan",
            childrenMenu: []
        },
        {
            name: "SOP",
            icon: "clipboard-outline",
            bgColor: "bg-pink-600",
            route: "/portal/sop",
            childrenMenu: []
        },
        {
            name: "PPID",
            icon: "information-circle-outline",
            bgColor: "bg-indigo-600",
            route: "/portal/ppid",
            childrenMenu: []
        },
        {
            name: "PENGADUAN",
            icon: "chatbubble-outline",
            bgColor: "bg-orange-600",
            route: "/portal/pengaduan",
            childrenMenu: []
        },
        {
            name: "STATISTIK",
            icon: "stats-chart-outline",
            bgColor: "bg-teal-600",
            route: "/portal/statistik",
            childrenMenu: []
        },
        
        {
            name: "STACKHOLDER",
            icon: "people-outline",
            bgColor: "bg-lime-600",
            route: "/app-restricted-external",
            childrenMenu: []
        },
        {
            name: "INTERNAL",
            icon: "apps-outline",
            bgColor: "bg-gray-500",
            image : PerhubunganLogo,
            route: "/app-restricted-internal",
            childrenMenu: []
        },
        {
            name: "TENTANG KAMI",
            icon: "",
            image : BluLogo,
            bgColor: "bg-cyan-500",
            route: "/portal/tentang-kami",
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
        <View className=" my-6">
            {/* Render parent menus */}
            {chunkedMenus.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 12 }}>
                    {row.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{ alignItems: "center", width: "23%", marginHorizontal: 4 }}
                            onPress={() => handleParentPress(item)}
                        >
                            {item.image ? (<Image source={item.image} style={{ width: 60, height: 60 }} className=" rounded-full" />) : (<View className={`justify-center items-center rounded-full p-4 border border-white ${item.bgColor}`}>
                                <Ionicons name={item.icon} size={28} color="#ffffff" />
                            </View>)}
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

            
            
            
            
        </View>
    );
}
