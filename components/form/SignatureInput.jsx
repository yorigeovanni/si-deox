import React, { useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { Controller } from 'react-hook-form';
import Signature from 'react-native-signature-canvas';

export default function SignatureInput({ control, name, label, rules }) {
    const ref = useRef(null);

    if (!control) {
        return <Text style={{ color: 'red' }}>Error: control is required</Text>;
    }

    return (
        <Controller
            control={control}
            name={name} // store base64 signature
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                const handleOK = (signature) => {
                    onChange(signature); // signature is base64
                };

                const handleClear = () => {
                    ref.current?.clearSignature();
                    onChange(null);
                };

                return (
                    <View style={{ marginVertical: 8 }}>
                        {label && <Text>{label}</Text>}
                        <Signature
                            ref={ref}
                            onOK={handleOK}
                            onClear={handleClear}
                            descriptionText="Tanda Tangan"
                            webStyle={`.m-signature-pad--footer {display: none;}`}
                        />
                        <Button title="Clear" onPress={handleClear} />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
                );
            }}
        />
    );
}
