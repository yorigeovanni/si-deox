import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
    CameraView,
    useCameraPermissions,
} from 'expo-camera';

export default function QrScannerExample() {
    // Minta permission kamera
    const [permission, requestPermission] = useCameraPermissions();

    // Atur kamera menghadap 'back' (bisa 'front' juga)
    const [facing, setFacing] = useState('back');

    // Simpan hasil QR yang discan
    const [scannedData, setScannedData] = useState(null);

    // Kalau permission belum beres loading, tampilkan apa saja
    if (!permission) {
        return <View style={styles.container} />;
    }

    // Kalau belum diizinkan, minta user menekan "grant permission"
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    // Callback saat berhasil scan
    const handleBarCodeScanned = ({ type, data }) => {
        console.log('Scanned Type:', type, 'Data:', data);
        setScannedData(data);
        // misal Anda bisa set modal off, navigate, dsb.
    };

    // Fungsi untuk membalik kamera front/back
    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            {/* Komponen CameraView baru */}
            <CameraView
                style={styles.camera}
                facing={facing}                  // 'back' atau 'front'
                barCodeScannerEnabled           // aktifkan pemindaian barcode
                onBarCodeScanned={handleBarCodeScanned}
                barCodeScannerSettings={{
                    // Batasi hanya QR code
                    barCodeTypes: ['qr'],
                }}
            >
                <View style={styles.overlay}>
                    <Text style={styles.text}>Flip Camera</Text>
                    <Button title="Flip" onPress={toggleCameraFacing} />
                </View>
            </CameraView>

            <View style={styles.infoContainer}>
                <Text>Scanned Data: {scannedData || '(none)'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    message: { textAlign: 'center', paddingBottom: 10 },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: 32,
        backgroundColor: 'transparent',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 12,
    },
    infoContainer: {
        padding: 16,
    },
});
