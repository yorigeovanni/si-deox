import { useCallback, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { tokenInternalRequest, tokenIntenalRequestVerified } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { OtpInput } from "react-native-otp-entry";
import LogoPutih from '@/assets/logo-putih.png';


export default function SignInScreen() {
  const otpInputRef = useRef(null);
  const [otpValue, setOtpValue] = useState("");
  const [nip_nik, setNipNik] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const { internalUser } = useSelector((state) => state.auth);
  const { user, loading, error, otpToken } = internalUser;




  const handleSignIn = useCallback(() => {
    dispatch(tokenInternalRequest({ nip_nik }));
  }, [dispatch, nip_nik]);



  const handleOtpComplete = (code) => {
    //if (lockedUntil) {
    //  const now = new Date();
    //  const lockUntil = new Date(lockedUntil);
    //  if (now < lockUntil) return;
    // }
    setOtpValue(code);
    dispatch(tokenIntenalRequestVerified({ otp: code }));
  };




  useFocusEffect(useCallback(()=>{
    if(loading){
      return;
    }
    if(!loading && !error && user){
      router.replace("/home/landing-aplikasi-internal");
    }
  },[user, loading, error]));





  

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#991B1B", "#500724"]}
        style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-between px-6 pt-32 pb-24">
            {/* Header Section */}
            <View className="items-center mb-2">
              <Image
                source={LogoPutih}
                className="items-center w-36 h-24 rounded-3xl"
              />
              <Text className="text-white text-3xl font-bold mb-2">
                INTERNAL LOGIN
              </Text>
              <Text className="text-white/80 text-center">
                metode login menggunakan One Time Password {`(OTP)`} yang
                dikirimkan ke no handphone terdaftar melalui WhatsApp
              </Text>
            </View>

            {/* Form Section */}
            <View className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg">
              {error ? (
                <View className="bg-red-500/20 p-4 rounded-xl mb-4">
                  <Text className="text-white text-center">{error}</Text>
                </View>
              ) : null}

              {otpToken ? (
                <View className="space-y-4">
                  <Text className="text-white/90 text-lg font-bold text-center mb-4">
                    Masukkan Kode OTP
                  </Text>

                  {loading ? (
                    <View className="py-8 items-center">
                      <ActivityIndicator size="large" color="#ffffff" />
                      <Text className="text-white mt-4 text-center">
                        Memverifikasi OTP...
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <OtpInput
                        ref={otpInputRef}
                        numberOfDigits={6}
                        onFilled={handleOtpComplete}
                        value={otpValue}
                        theme={{
                          containerStyle: {
                            marginBottom: 24,
                          },
                          inputsContainerStyle: {
                            marginBottom: 8,
                          },
                          pinCodeContainerStyle: {
                            borderWidth: 1,
                            borderColor: "rgba(255,255,255,0.2)",
                            borderRadius: 12,
                            backgroundColor: "rgba(255,255,255,0.1)",
                            height: 52,
                          },
                          focusStickStyle: {
                            backgroundColor: "#991B1B",
                          },
                          pinCodeTextStyle: {
                            color: "#ffffff",
                            fontSize: 20,
                            fontWeight: "600",
                          },
                        }}
                      />
                    </View>
                  )}
                </View>
              ) : (
                <View className="space-y-4">
                  <View>
                    <Text className="text-white/90 mb-2 ml-1">
                      NIP ASN / NIK NON ASN
                    </Text>
                    <View className="flex-row items-center bg-white/10 rounded-xl p-4">
                      <Ionicons name="person-outline" size={20} color="white" />
                      <TextInput
                        className="flex-1 text-white ml-3"
                        placeholder="min. 12 - max. 21 characters"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        value={nip_nik}
                        onChangeText={setNipNik}
                        autoCapitalize="none"
                        //keyboardType="email-address"
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    className={`bg-red-700/50 py-4 rounded-xl mt-4 ${
                      loading ? "opacity-70" : ""
                    }`}
                    onPress={handleSignIn}
                    disabled={loading}
                  >
                    <Text className="text-white text-center font-bold text-lg">
                      {loading ? "Signing in..." : "REQUEST OTP"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Footer Section */}
            <View className="mt-8 flex-col justify-center items-center">
              <Text className="text-white/80">KEMENTERIAN PERHUBUNGAN</Text>
              <Text className="text-white/80">
                DIREKTORAT JENDERAL PERHUBUNGAN UDARA
              </Text>
              <Text className="text-white/80">
                KANTOR BLU UPBU KELAS I DEO - SORONG
              </Text>
              <Text className="text-white/80 mt-16">
                © copyright {currentYear}. DEO Smart Airport
              </Text>
              <TouchableOpacity
                className="flex-row justify-center items-center"
                onPress={() => router.replace("/")}
              >
                <Text className="text-white font-bold mt-2">BACK TO HOME</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
