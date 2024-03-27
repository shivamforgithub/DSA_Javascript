import { maskJSON2 } from 'maskdata';

export const aadharMaskConfig = {
  cardMaskOptions: {
    maskWith: 'X',
    unmaskedStartDigits: 0,
    unmaskedEndDigits: 4,
  },
  cardFields: ['aadhaarNumber', 'aadhaarNo'],
};

export const SENSITIVE_DATA_LOGS_MASK_INFO = [
  {
    urlRegex: '^/v1/loan-applications/[0-9]+/aadhaar/send-otp$',
    maskUtility: maskJSON2,
    maskOptions: aadharMaskConfig,
  },
  {
    urlRegex: '^/v1/loan-applications/[0-9]+/aadhaar/verify-otp$',
    maskUtility: maskJSON2,
    maskOptions: aadharMaskConfig,
  },
  {
    urlRegex: '^/v2/loan-applications/[A-Za-z0-9_]+/aadhaar/verify-otp$',
    maskUtility: maskJSON2,
    maskOptions: aadharMaskConfig,
  },
  {
    urlRegex: '^/v2/loan-applications/[A-Za-z0-9_]+/aadhaar/send-otp$',
    maskUtility: maskJSON2,
    maskOptions: aadharMaskConfig,
  },
];

export const AADHAAR_URLS = [
  '/v3/get-aadhaar-otp',
  '/v3/get-aadhaar-file',
  '/v3/aadhaar-consent',
  '/v3/aadhaar-xml/otp',
  '/v3/aadhaar-xml/file',
];

export const sensitiveAadhaarMaskConfig = () => {
  const sensitiveAadhaardataMasking = [];

  AADHAAR_URLS.forEach((url) => {
    sensitiveAadhaardataMasking.push({
      urlRegex: url,
      maskUtility: maskJSON2,
      maskOptions: aadharMaskConfig,
    });
  });
  return sensitiveAadhaardataMasking;
};
