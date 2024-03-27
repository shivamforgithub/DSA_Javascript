import { ErrorResponseModel } from '../models/error.response.model';

export const INCORRECT_CIN: ErrorResponseModel = {
  code: 'ERR_INCORRECT_CIN',
  message: 'Incorrect CIN number',
};

export const NO_FILE_UPLOADED: ErrorResponseModel = {
  code: 'ERR_NO_FILE_UPLOADED',
  message: 'Upload a file.',
};

export const EMPTY_FILE_NAME: ErrorResponseModel = {
  code: 'ERR_EMPTY_FILE_NAME',
  message: 'Empty file name',
};

export const OTP_MISMATCH: ErrorResponseModel = {
  code: 'ERR_OTP_MISMATCH',
  message: 'OTP mismatch',
};

export const AADHAAR_XML_ALREADY_DOWNLOADED: ErrorResponseModel = {
  code: 'ERR_FILE_ALREADY_DOWNLOADED',
  message: 'File Already downloaded',
};

export const OTP_EXPIRED: ErrorResponseModel = {
  code: 'ERR_OTP_EXPIRED',
  message: 'OTP is expired',
};

export const AADHAAR_UNVERIFIED: ErrorResponseModel = {
  code: 'ERR_AADHAAR_UNVERIFIED',
  message: 'Aadhaar is unverified',
};

export const MISSING_AADHAAR: ErrorResponseModel = {
  code: 'ERR_MISSING_AADHAAR',
  message: 'user aadhaar is mandatory',
};

export const MISSING_PAN: ErrorResponseModel = {
  code: 'ERR_MISSING_PAN',
  message: 'user PAN is mandatory',
};

export const MISSING_IDENTIFIER_PAN: ErrorResponseModel = {
  code: 'ERR_MISSING_IDENTIFIER_PAN',
  message: 'PAN is not added as an identifier',
};

export const PAN_MISMATCH_IDENTIFIER_PAN: ErrorResponseModel = {
  code: 'ERR_PAN_MISMATCH_IDENTIFIER_PAN',
  message: 'PAN is mismatched with identifier pan',
};

export const INVALID_AADHAR_NUMBER: ErrorResponseModel = {
  code: 'ERR_INVALID_AADHAR_NUMBER',
  message: 'Aadhaar number is Invalid.',
};

export const MAX_RETRIES: ErrorResponseModel = {
  code: 'ERR_MAX_RETRIES',
  message: 'Max retries exceeded',
};

export const INVALID_TIMESTAMP: ErrorResponseModel = {
  code: 'ERR_INVALID_TIMESTAMP',
  message: 'Invalid timestamp or Invalid input',
};

export const UPLOAD_FILE: ErrorResponseModel = {
  code: 'ERR_UPLOAD_FILE',
  message: 'Upload a file.',
};

export const INCORRECT_CIN_DETAILS: ErrorResponseModel = {
  code: 'ERR_INCORRECT_CIN_DETAILS',
  message: 'Incorrect CIN details provided.',
};

export const ITR_ACCESS_INVALID: ErrorResponseModel = {
  code: 'ERR_ITR_ACCESS_INVALID',
  message: 'User not has itr e-Filing access.',
};

export const BANK_VERIFICATION_FAILED: ErrorResponseModel = {
  code: 'ERR_BANK_VERIFICATION',
  message: 'Bank verification failed.',
};

export const INTERNAL_SERVER_ERROR = 'Internal Server Error';

export const INVALID_PAN_NUMBER: ErrorResponseModel = {
  code: 'ERR_INVALID_PAN_NUMBER',
  message: 'Invalid PAN number.',
};

export const CONSENT_REQUIRED: ErrorResponseModel = {
  code: 'ERR_CONSENT_REQUIRED',
  message: 'Consent is required.',
};

export const SOMETHING_WENT_WRONG: ErrorResponseModel = {
  code: 'ERR_SOMETHING_WENT_WRONG',
  message: 'An error occurred internally, please try again.',
};

export const PAN_ALREADY_EXIST: ErrorResponseModel = {
  code: 'ERR_PAN_ALREADY_EXIST',
  message: 'PAN already exist.',
};

export const INVALID_PAYLOAD_DATA: ErrorResponseModel = {
  code: 'ERR_INVALID_PAYLOAD',
};

export const INVALID_LOAN_APPLICATION: ErrorResponseModel = {
  code: 'ERR_INVALID_LOAN_APPLICATION',
  message: 'Invalid loan application',
};

export const INVALID_USER_LOAN_APPLICATION_ASSOCIATION: ErrorResponseModel = {
  code: 'ERR_USER_LOAN_APPLICATION_ASSOCIATION',
  message: 'Loan application is not linked with user.',
};

export const PARTNER_ID_INVALID: ErrorResponseModel = {
  code: 'ERR_PARTNER_ID_INVALID',
  message: 'invalid partner id',
};

export const PARTNER_CUSTOMER_ID_MISSING: ErrorResponseModel = {
  code: 'ERR_PARTNER_CUSTOMER_ID_MISSING',
  message: 'partner customer id missing',
};

export const PARTNER_ID_MISSING: ErrorResponseModel = {
  code: 'ERR_PARTNER_ID_MISSING',
  message: 'partner id missing',
};

export const MOBILE_NO_INVALID: ErrorResponseModel = {
  code: 'ERR_MOBILE_NUMBER_INVALID',
  message: 'invalid mobile number',
};

export const LOAN_APPLICATION_ID_REQUIRED: ErrorResponseModel = {
  code: 'ERR_LOAN_APPLICATION_ID_REQUIRED',
  message: 'loan application id is required',
};

export const UNAUTHORIZED_ACCESS: ErrorResponseModel = {
  code: 'ERR_UNAUTHORIZED_ACCESS',
  message: 'Unauthorized access',
};

export const OTP_MISMATCH_OR_EXPIRED: ErrorResponseModel = {
  code: 'ERR_OTP_MISMATCH_OR_EXPIRED',
  message: 'OTP expired or incorrect OTP entered',
};

export const REQUEST_INVALID: ErrorResponseModel = {
  code: 'ERR_REQUEST_INVALID',
  message: 'Request invalid',
};

export const INPUT_INVALID: ErrorResponseModel = {
  code: 'ERR_INPUT_INVALID',
  message: 'Input invalid',
};

export const ERR_ACTIVE_LOAN_APPLICATION: ErrorResponseModel = {
  code: 'ERR_ACTIVE_LOAN_APPLICATION',
  message: 'active loan application',
};

export const CIN_MISSING: ErrorResponseModel = {
  code: 'ERR_CIN_MISSING',
  message: 'CIN is missing',
};

export const WORKFLOW_NOT_FOUND: ErrorResponseModel = {
  code: 'ERR_WORKFLOW_NOT_FOUND',
  message: 'Workflow not found',
};