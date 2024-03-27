import { ENV_PARAMS } from '../../../config/default';

export const SMS_SERVICE_URL = ENV_PARAMS.smsServiceUrl;
export const MOBILE_NUMBER_REGEX = /^[0-9]{10}$/;
export const FOUR_DIGIT_OTP_REGEX = /^[0-9]{4}$/;
export const SIX_DIGIT_OTP_REGEX = /^[0-9]{6}$/;

export const DOCUMENT_MAX_SIZE = 10000000; // In Bytes

export const DEFAULT_EMPTY = '';

export const TRUE_STR = 'true';

export const DUMMY_MANDATE_EXTERNAL_ID = 'DL_DUMMY_MANDATE_1';

export const TRACING_ID_HEADER_KEY = 'X-TRACING-ID';
export const VIDEO_KYC_MIN_LOAN_AMOUNT = 60000;
export const RENEWAL_LOAN_LOS_PRODUCT_KEY = 'BL21R'; // TODO: to be moved to dl-middleware in DL-2897