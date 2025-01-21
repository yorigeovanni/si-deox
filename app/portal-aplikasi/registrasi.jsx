import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';




// ----------------------
// Komponen Utama
// ----------------------
export default function AppRegistrasi() {
  // State untuk form
  const [form, setForm] = useState({
    idNumber: '',
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    photo: null,
    agreement: false,
  });

  // Fungsi untuk mengubah nilai di form
  const handleInputChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };





  // Data contoh perusahaan (hardcoded)
  const companyOptions = [
    { label: 'PT. ABC', value: 'PT. ABC' },
    { label: 'PT. DEF', value: 'PT. DEF' },
    { label: 'PT. GHI', value: 'PT. GHI' },
  ];

  // Fungsi submit
  const handleSubmit = () => {
    if (form.agreement) {
      console.log('Form submitted:', form);
      // Tambahkan logika submit di sini
    } else {
      alert('Anda harus menyetujui persyaratan sebelum submit!');
    }
  };

  // Fungsi cancel (reset form)
  const handleCancel = () => {
    setForm({
      idNumber: '',
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      photo: null,
      agreement: false,
    });
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Input Row 1: Nomor Identitas & Nama Lengkap */}
      <View className="flex flex-row space-x-4 mb-4">
        <TextInput
          className="flex-1 h-12 border border-gray-400/25 px-4 rounded-lg m-1"
          placeholder="No KTP/SIM/Passport"
          value={form.idNumber}
          onChangeText={(value) => handleInputChange('idNumber', value)}
        />
        <TextInput
          className="flex-1 h-12 border border-gray-400/25 px-4 rounded-lg m-1"
          placeholder="Nama Lengkap"
          value={form.fullName}
          onChangeText={(value) => handleInputChange('fullName', value)}
        />
      </View>

      {/* Input Row 2: Custom Select untuk Perusahaan */}
      <View className="mb-4">
        <ManyToOneInput
          model={'x_data_operator'}
          label="Nama Perusahaan"
          selectedValue={form.companyName}
          onSelect={(value) => handleInputChange('companyName', value)}
          options={companyOptions}
        />
      </View>

      {/* Input Row 3: Email */}
      <View className="mb-4">
        <TextInput
          className="w-full h-12 border border-gray-400/25 px-4 rounded-lg m-1"
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
      </View>

      {/* Input Row 4: Nomor Telepon */}
      <View className="mb-4">
        <TextInput
          className="w-full h-12 border border-gray-400/25 px-4 rounded-lg m-1"
          placeholder="Nomor Telepon"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
        />
      </View>

      {/* Row 5: Upload Foto */}
      <View className="mb-4">
        <TouchableOpacity
          className="w-full h-40 bg-red-800 rounded-lg justify-center items-center"
          onPress={() => alert('Upload Foto Resmi (Belum Implementasi)')}
        >
          <Text className="text-white">Upload Foto Resmi</Text>
        </TouchableOpacity>
      </View>

      {/* Checkbox Persetujuan */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity
          className={`w-6 h-6 rounded border border-gray-400 mr-2 ${form.agreement ? 'bg-green-600' : ''
            }`}
          onPress={() => handleInputChange('agreement', !form.agreement)}
        />
        <Text className="text-gray-700">
          Saya menyetujui persyaratan dan ketentuan
        </Text>
      </View>

      {/* Tombol Submit & Cancel */}
      <View className="flex-row justify-between">
        <TouchableOpacity
          className="bg-red-600 px-6 py-3 rounded-lg"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold">Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-400 px-6 py-3 rounded-lg"
          onPress={handleCancel}
        >
          <Text className="text-white font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ----------------------
// Komponen Custom Select
// ----------------------
function ManyToOneInput({model,  label, selectedValue, onSelect, options }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Buka drawer
  const openDrawer = () => {
    setDrawerVisible(true);
  };

  // Tutup drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Ketika item dipilih
  const handleSelectItem = (value) => {
    onSelect(value);
    closeDrawer();
  };

  return (
    <View className="w-full">
      {/* Tombol untuk membuka drawer */}
      <TouchableOpacity
        className="border border-gray-300 rounded-md py-3 px-3"
        onPress={openDrawer}
      >
        <Text className="text-gray-800">
          {selectedValue || label || 'Pilih Opsi'}
        </Text>
      </TouchableOpacity>

      {/* Modal sebagai drawer */}
      <Modal
        visible={drawerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDrawer}
      >
        {/* Overlay latar belakang */}
        <TouchableOpacity
          className="flex-1 bg-[rgba(0,0,0,0.3)] justify-center"
          activeOpacity={1}
          onPress={closeDrawer}
        >
          {/* Konten drawer (fullscreen) */}
          <View className="flex-1 bg-white rounded-none p-4">
            <Text className="text-base font-bold mb-2">
              {label || 'Pilih Item'}
            </Text>
            <ScrollView className="flex-1">
              {options?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="border-b border-gray-200/25 py-3"
                  onPress={() => handleSelectItem(item.value)}
                >
                  <Text className="text-sm text-gray-700">{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
