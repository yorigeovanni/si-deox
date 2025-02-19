import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { OtpInput } from 'react-native-otp-entry';
import PhoneInput from 'react-native-international-phone-number';
import { startDeviceRegistration, verifyOtp, resetRegistration, checkLockStatus } from '@/store/slices/deviceSlice';
import { createPhoneSchema } from '@/utils/phoneValidation';

const LOGO_IMAGE = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80';
const OTP_EXPIRY_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

export default function DeviceRegistration() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpTimeLeft, setOtpTimeLeft] = useState(0);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);
  const [otpValue, setOtpValue] = useState('');
  const otpInputRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState({
    callingCode: '+62',
    cca2: 'ID',
    flag: '🇮🇩',
    name: { en: 'Indonesia' }
  });
  
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const {
    isLoading,
    isError,
    errorMessage,
    tokenRegistration,
    lastRegistrationAttempt,
    otpAttempts,
    lockedUntil
  } = useSelector(state => state.device);




  // Validate phone number when it changes
  useEffect(() => {
    if (phoneNumber) {
      try {
        const schema = createPhoneSchema(selectedCountry.cca2);
        schema.parse(phoneNumber.replace(/\D+/g, ''));
        setPhoneError('');
      } catch (error) {
        if (error.errors?.[0]?.message) {
          setPhoneError(error.errors[0].message);
        }
      }
    } else {
      setPhoneError('');
    }
  }, [phoneNumber, selectedCountry]);





  // Reset OTP input when error occurs
  useEffect(() => {
    if (isError && otpInputRef.current) {
      setOtpValue('');
      if (otpInputRef.current.clear) {
        otpInputRef.current.clear();
      }
    }
  }, [isError]);




  // Handle OTP expiration timer
  useEffect(() => {
    let timer;
    if (lastRegistrationAttempt) {
      const expirationTime = new Date(lastRegistrationAttempt).getTime() + OTP_EXPIRY_TIME;
      
      const updateOtpTimer = () => {
        const now = new Date().getTime();
        const remaining = Math.max(0, Math.floor((expirationTime - now) / 1000));
        
        setOtpTimeLeft(remaining);

        if (remaining <= 0) {
          clearInterval(timer);
          dispatch(resetRegistration());
        }
      };

      updateOtpTimer();
      timer = setInterval(updateOtpTimer, 1000);
    }
    return () => clearInterval(timer);
  }, [lastRegistrationAttempt]);





  // Handle device lockout timer
  useEffect(() => {
    let timer;
    if (lockedUntil) {
      const lockoutEndTime = new Date(lockedUntil).getTime();
      
      const updateLockoutTimer = () => {
        const now = new Date().getTime();
        const remaining = Math.max(0, Math.floor((lockoutEndTime - now) / 1000));
        
        setLockoutTimeLeft(remaining);

        if (remaining <= 0) {
          clearInterval(timer);
          dispatch(checkLockStatus());
        }
      };

      updateLockoutTimer();
      timer = setInterval(updateLockoutTimer, 1000);
    }
    return () => clearInterval(timer);
  }, [lockedUntil]);





  // Reset phone number when max OTP attempts reached
  useEffect(() => {
    if (otpAttempts >= 3) {
      setPhoneNumber('');
      setOtpValue('');
    }
  }, [otpAttempts]);





  const handleSelectedCountry = (country) => {
    setSelectedCountry(country);
    // Clear phone number when country changes to force revalidation
    setPhoneNumber('');
    setPhoneError('');
  };

  const handleSubmit = () => {
    if (!phoneNumber || phoneError) return;
    
    try {
      const schema = createPhoneSchema(selectedCountry.cca2);
      const cleanNumber = phoneNumber.replace(/\D+/g, '');
      schema.parse(cleanNumber);
      
      const formattedNumber = selectedCountry.callingCode.replace(/^\+/, '') + cleanNumber;
      dispatch(startDeviceRegistration({ phoneNumber: formattedNumber }));
    } catch (error) {
      if (error.errors?.[0]?.message) {
        setPhoneError(error.errors[0].message);
      }
    }
  };





  const handleOtpComplete = (code) => {
    if (lockedUntil) {
      const now = new Date();
      const lockUntil = new Date(lockedUntil);
      if (now < lockUntil) return;
    }
    setOtpValue(code);
    dispatch(verifyOtp({ otp: code }));
  };





  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };




  const isPhoneInputDisabled = !!lockedUntil && new Date() < new Date(lockedUntil);


  
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#991B1B', '#500724']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-between px-6 pt-32 pb-24">
            <View className="items-center mb-2">
              <Image
                source={{ uri: LOGO_IMAGE }}
                className="w-24 h-24 rounded-3xl mb-6"
              />
              <Text className="text-white text-3xl font-bold mb-2">DEO AIRPORT</Text>
              <Text className="text-white/80 text-center">
                metode login menggunakan One Time Password {`(OTP)`} yang dikirimkan ke no handphone terdaftar melalui WhatsApp
              </Text>
            </View>

            <View className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg">
              {isError && (
                <View className="bg-red-500/20 p-4 rounded-xl mb-4">
                  <Text className="text-white text-center">{errorMessage}</Text>
                </View>
              )}

              {tokenRegistration ? (
                <View className="space-y-4">
                  <Text className="text-white/90 text-lg font-bold text-center mb-4">
                    Masukkan Kode OTP
                  </Text>

                  {isLoading ? (
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
                            borderColor: 'rgba(255,255,255,0.2)',
                            borderRadius: 12,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            height: 52,
                          },
                          focusStickStyle: {
                            backgroundColor: '#991B1B',
                          },
                          pinCodeTextStyle: {
                            color: '#ffffff',
                            fontSize: 20,
                            fontWeight: '600',
                          },
                        }}
                      />
                    </View>
                  )}

                  <View className="flex-row items-center justify-center space-x-2">
                    <View className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <Text className="text-white/80">Waktu tersisa: {formatTime(otpTimeLeft)}</Text>
                  </View>

                  {!isPhoneInputDisabled && otpAttempts > 0 && (
                    <View className="bg-yellow-500/20 p-4 rounded-xl">
                      <Text className="text-white text-center">
                        Sisa percobaan: {3 - otpAttempts}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View className="space-y-4">
                  <View>
                    <Text className="text-white/90 mb-2 ml-1">Nomor Handphone</Text>
                    <PhoneInput
                      defaultCountry="ID"
                      value={phoneNumber}
                      onChangePhoneNumber={setPhoneNumber}
                      selectedCountry={selectedCountry}
                      onChangeSelectedCountry={handleSelectedCountry}
                      disabled={isPhoneInputDisabled}
                      phoneInputStyles={{
                        container: {
                          backgroundColor: isPhoneInputDisabled ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                          borderWidth: 1,
                          borderColor: phoneError ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                          borderRadius: 12,
                          opacity: isPhoneInputDisabled ? 0.5 : 1,
                        },
                        flagContainer: {
                          borderTopLeftRadius: 11,
                          borderBottomLeftRadius: 11,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          justifyContent: 'center',
                          paddingHorizontal: 12,
                        },
                        caret: {
                          color: '#ffffff',
                        },
                        divider: {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        callingCode: {
                          color: '#ffffff',
                          fontSize: 16,
                        },
                        input: {
                          color: '#ffffff',
                          fontSize: 16,
                          height: 52,
                          paddingHorizontal: 12,
                        },
                      }}
                      modalStyles={{
                        modal: {
                          backgroundColor: '#1a1a1a',
                        },
                        divider: {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        searchInput: {
                          color: '#ffffff',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: 12,
                        },
                        countryButton: {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        callingCode: {
                          color: '#ffffff',
                        },
                        countryName: {
                          color: '#ffffff',
                        },
                      }}
                    />
                    {phoneError && (
                      <Text className="text-yellow-200 text-sm mt-2 ml-1">
                        {phoneError}
                      </Text>
                    )}
                  </View>

                  <TouchableOpacity
                    className={`bg-red-700/50 py-4 rounded-xl mt-4 ${
                      isLoading || isPhoneInputDisabled || phoneError ? 'opacity-70' : ''
                    }`}
                    onPress={handleSubmit}
                    disabled={isLoading || isPhoneInputDisabled || !!phoneError}
                  >
                    {isLoading ? (
                      <View className="flex-row items-center justify-center space-x-2">
                        <ActivityIndicator color="#ffffff" />
                        <Text className="text-white font-bold text-lg">
                          MEMPROSES...
                        </Text>
                      </View>
                    ) : (
                      <Text className="text-white text-center font-bold text-lg">
                        {isPhoneInputDisabled ? 
                          `TUNGGU ${formatTime(lockoutTimeLeft)}` : 
                          'REQUEST OTP'
                        }
                      </Text>
                    )}
                  </TouchableOpacity>

                  {isPhoneInputDisabled && (
                    <View className="bg-red-500/20 p-4 rounded-xl">
                      <Text className="text-white text-center">
                        Akun terkunci. Coba lagi dalam {formatTime(lockoutTimeLeft)}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>

            <View className="mt-8">
              <Text className="text-white/80 text-center">KEMENTERIAN PERHUBUNGAN</Text>
              <Text className="text-white/80 text-center">DIREKTORAT JENDERAL PERHUBUNGAN UDARA</Text>
              <Text className="text-white/80 text-center">KANTOR BLU UPBU KELAS I DEO - SORONG</Text>
              <Text className="text-white/80 text-center mt-16">© copyright {currentYear}. DEO Smart Airport</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}