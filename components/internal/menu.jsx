import React, { Fragment, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import aplikasiInternalActions from "@/state/aplikasiInternal/aplikasiInternalSlice";
import { classNames, chunkArray } from "@/utils";





export default function MenuInternal({
    basePath = "/app-restricted-internal",
    target = 'menuUtama'
}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const aplikasiInternal = useSelector((state) => state.aplikasiInternal);

    const menuItems = useMemo(() => {
        return aplikasiInternal[target]
    }, [aplikasiInternal, target]);

    const chunkedMenus = chunkArray(menuItems, 4);


    const handleParentPress = useCallback((item) => {
        if (item.childrenMenu && item.childrenMenu.length > 0) {
            dispatch(
                aplikasiInternalActions.setMenuActive({
                    parent: item,
                    children: item.childrenMenu,
                    visible: true
                })
            );
        } else {
            router.replace(`${basePath}${item.route}`);
        }
    }, [dispatch, router, basePath]);



    const handleChildPress = useCallback((child) => {
        router.replace(`${basePath}${aplikasiInternal?.menuActive?.parent?.route}${child.route}`);
    }, [dispatch, router, aplikasiInternal]);



    const closeModal = useCallback(() => {
        dispatch(
            aplikasiInternalActions.setMenuActive({
                parent: null,
                children: [],
                visible: false,
            })
        );
    }, [dispatch]);



    const renderChildrenMenu = (parent) => {
        const chunkedChild = chunkArray(aplikasiInternal?.menuActive.children, 4);
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
                                        backgroundColor: parent.bgColor || "#0ea5e9",
                                    }}
                                >
                                    <Ionicons name={child.icon} size={28} color="#ffffff" />
                                </View>
                                <Text
                                    numberOfLines={2}
                                    style={{
                                        marginTop: 4,
                                        color: "#333",
                                        fontSize: 12,
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
                                className={classNames(`justify-center items-center rounded-full p-4`)}
                                style={{
                                    backgroundColor: aplikasiInternal?.menuActive?.parent?.name == item.name ? item.bgColor : "transparent",
                                    borderWidth: 1,
                                    borderColor: item.bgColor,
                                }}
                            >
                                <Ionicons name={item.icon} size={28} color={aplikasiInternal?.menuActive?.parent?.name == item.name ? '#ffffff' : item.bgColor} />
                            </View>
                            <Text
                                numberOfLines={2}  // up to 2 lines
                                className="mt-1 text-gray-800 text-xs text-center"
                                style={{ maxWidth: 150, }}  // atur lebar agar wrap
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}

            {Platform.OS === 'ios' ? (<Modal
                visible={aplikasiInternal?.menuActive.visible}
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    {/* overlay area di atas */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={closeModal}
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
                            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>{aplikasiInternal?.menuActive?.parent?.name}</Text>
                            <TouchableOpacity onPress={closeModal}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        {renderChildrenMenu(aplikasiInternal?.menuActive?.parent)}
                    </View>
                </View>
            </Modal>) : (<View style={{ width: "100%", height: "100%", position: "absolute" }}>
                <Modal
                    visible={aplikasiInternal?.menuActive.visible}
                    transparent={true}
                    //animationType="slide"
                    onRequestClose={closeModal}
                >
                    <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        {/* overlay area di atas */}
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            activeOpacity={1}
                            onPress={closeModal}
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
                                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>{aplikasiInternal?.menuActive?.parent?.name}</Text>
                                <TouchableOpacity onPress={closeModal}>
                                    <Ionicons name="close" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>

                            {renderChildrenMenu(aplikasiInternal?.menuActive?.parent)}
                        </View>
                    </View>
                </Modal>
            </View>)}
        </Fragment>
    );
}
