import { Platform } from 'react-native';

const MOCK_PHONE = '6282291914470';
const VALID_OTP = '123456';
const TOKEN_EXPIRY_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds

export const mockDeviceRegistration = async (phoneNumber) => {
  // Simulate 5 second loading delay
  await new Promise(resolve => setTimeout(resolve, 5000));

  if (phoneNumber === MOCK_PHONE) {
    return {
      success: true,
      token: 'mock-registration-token',
      expiresAt: Date.now() + TOKEN_EXPIRY_TIME
    };
  }

  throw new Error('Invalid phone number. Use +6282291914470 for testing.');
};

export const mockVerifyOtp = async (token, otp) => {
  // Simulate 5 second loading delay
  await new Promise(resolve => setTimeout(resolve, 5000));

  if (otp === VALID_OTP) {
    return {
      success: true,
      jwtAccessToken: 'mock-jwt-token'
    };
  }

  throw new Error('Invalid OTP. Use 123456 for testing.');
};