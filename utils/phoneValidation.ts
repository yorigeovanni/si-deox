import { z } from 'zod';

// Phone number validation patterns for different countries
const phonePatterns = {
  // Asia Pacific
  ID: /^(?!0)[0-9]{9,12}$/, // Indonesia: 9-12 digits, no leading 0
  SG: /^[689][0-9]{7}$/, // Singapore: 8 digits, starts with 6,8,9
  MY: /^[13456789][0-9]{7,8}$/, // Malaysia: 8-9 digits
  TH: /^[689][0-9]{8}$/, // Thailand: 9 digits, starts with 6,8,9
  VN: /^[0-9]{9,10}$/, // Vietnam: 9-10 digits
  PH: /^[0-9]{10}$/, // Philippines: 10 digits
  KR: /^[0-9]{9,11}$/, // South Korea: 9-11 digits
  JP: /^[0-9]{10,11}$/, // Japan: 10-11 digits
  
  // North America
  US: /^[2-9][0-9]{9}$/, // USA: 10 digits, no leading 1
  CA: /^[2-9][0-9]{9}$/, // Canada: 10 digits, no leading 1
  
  // Europe
  GB: /^[7][0-9]{9}$/, // UK: 10 digits, starts with 7
  DE: /^[15][0-9]{9,10}$/, // Germany: 10-11 digits, starts with 1 or 5
  FR: /^[67][0-9]{8}$/, // France: 9 digits, starts with 6 or 7
  IT: /^[3][0-9]{9}$/, // Italy: 10 digits, starts with 3
  ES: /^[6-7][0-9]{8}$/, // Spain: 9 digits, starts with 6 or 7
  NL: /^[6][0-9]{8}$/, // Netherlands: 9 digits, starts with 6
  
  // Middle East
  AE: /^[5][0-9]{8}$/, // UAE: 9 digits, starts with 5
  SA: /^[5][0-9]{8}$/, // Saudi Arabia: 9 digits, starts with 5
  QA: /^[3356][0-9]{7}$/, // Qatar: 8 digits, starts with 3,5,6
  
  // Africa
  ZA: /^[6-8][0-9]{8}$/, // South Africa: 9 digits, starts with 6-8
  NG: /^[7-9][0-9]{9}$/, // Nigeria: 10 digits, starts with 7-9
  EG: /^[1][0-9]{9}$/, // Egypt: 10 digits, starts with 1
  
  // South America
  BR: /^[1-9][0-9]{10}$/, // Brazil: 11 digits, starts with 1-9
  AR: /^[1-9][0-9]{9}$/, // Argentina: 10 digits, starts with 1-9
  CL: /^[9][0-9]{8}$/, // Chile: 9 digits, starts with 9
  
  // Oceania
  AU: /^[4][0-9]{8}$/, // Australia: 9 digits, starts with 4
  NZ: /^[2][0-9]{8}$/, // New Zealand: 9 digits, starts with 2
};

export const createPhoneSchema = (countryCode: string) => {
  const pattern = phonePatterns[countryCode] || /^[0-9]+$/;
  
  return z.string()
    .min(1, 'Phone number is required')
    .regex(pattern, {
      message: getValidationMessage(countryCode),
    });
};

const getValidationMessage = (countryCode: string) => {
  switch (countryCode) {
    // Asia Pacific
    case 'ID':
      return 'Invalid Indonesian phone number format. Must be 9-12 digits without leading 0';
    case 'SG':
      return 'Invalid Singapore phone number format. Must be 8 digits starting with 6, 8, or 9';
    case 'MY':
      return 'Invalid Malaysian phone number format. Must be 8-9 digits';
    case 'TH':
      return 'Invalid Thai phone number format. Must be 9 digits starting with 6, 8, or 9';
    case 'VN':
      return 'Invalid Vietnamese phone number format. Must be 9-10 digits';
    case 'PH':
      return 'Invalid Philippine phone number format. Must be 10 digits';
    case 'KR':
      return 'Invalid South Korean phone number format. Must be 9-11 digits';
    case 'JP':
      return 'Invalid Japanese phone number format. Must be 10-11 digits';
    
    // North America
    case 'US':
      return 'Invalid US phone number format. Must be 10 digits without leading 1';
    case 'CA':
      return 'Invalid Canadian phone number format. Must be 10 digits without leading 1';
    
    // Europe
    case 'GB':
      return 'Invalid UK phone number format. Must be 10 digits starting with 7';
    case 'DE':
      return 'Invalid German phone number format. Must be 10-11 digits starting with 1 or 5';
    case 'FR':
      return 'Invalid French phone number format. Must be 9 digits starting with 6 or 7';
    case 'IT':
      return 'Invalid Italian phone number format. Must be 10 digits starting with 3';
    case 'ES':
      return 'Invalid Spanish phone number format. Must be 9 digits starting with 6 or 7';
    case 'NL':
      return 'Invalid Dutch phone number format. Must be 9 digits starting with 6';
    
    // Middle East
    case 'AE':
      return 'Invalid UAE phone number format. Must be 9 digits starting with 5';
    case 'SA':
      return 'Invalid Saudi Arabian phone number format. Must be 9 digits starting with 5';
    case 'QA':
      return 'Invalid Qatari phone number format. Must be 8 digits starting with 3, 5, or 6';
    
    // Africa
    case 'ZA':
      return 'Invalid South African phone number format. Must be 9 digits starting with 6-8';
    case 'NG':
      return 'Invalid Nigerian phone number format. Must be 10 digits starting with 7-9';
    case 'EG':
      return 'Invalid Egyptian phone number format. Must be 10 digits starting with 1';
    
    // South America
    case 'BR':
      return 'Invalid Brazilian phone number format. Must be 11 digits starting with 1-9';
    case 'AR':
      return 'Invalid Argentinian phone number format. Must be 10 digits starting with 1-9';
    case 'CL':
      return 'Invalid Chilean phone number format. Must be 9 digits starting with 9';
    
    // Oceania
    case 'AU':
      return 'Invalid Australian phone number format. Must be 9 digits starting with 4';
    case 'NZ':
      return 'Invalid New Zealand phone number format. Must be 9 digits starting with 2';
    
    default:
      return 'Invalid phone number format';
  }
};