import React, { useState } from 'react';
import {
    View,
    Image,
    Pressable,
    TouchableOpacity,
    Modal,
    Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PreviewImage({ previewUri, onRemove }) {
    const [isFullScreen, setIsFullScreen] = useState(false);

    return (
        <View className="relative my-2 h-52 w-full rounded-lg overflow-hidden">
            {/* Tombol hapus di sudut kanan atas */}
            <Pressable
                onPress={onRemove}
                className="absolute top-0 right-0 z-10 bg-black p-2 rounded-full m-2"
            >
                <Ionicons name="trash-outline" size={18} color="#fff" />
            </Pressable>

            {/* Gambar kecil, di-press => tampilkan full screen */}
            <Pressable onPress={() => setIsFullScreen(true)}>
                <Image
                    source={{ uri: previewUri }}
                    className="h-full w-full"
                    resizeMode="cover"
                />
            </Pressable>

            {/* Modal untuk menampilkan gambar full screen */}
            <Modal
                visible={isFullScreen}
                transparent={true}
                onRequestClose={() => setIsFullScreen(false)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={{ uri: previewUri }}
                        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                    />

                    {/* Tombol Close */}
                    <TouchableOpacity
                        onPress={() => setIsFullScreen(false)}
                        style={{
                            position: 'absolute',
                            top: 40,
                            right: 20,
                        }}
                    >
                        <Ionicons name="close-circle" size={36} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
