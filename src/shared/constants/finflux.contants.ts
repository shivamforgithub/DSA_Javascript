export enum ANALYSIS_STATUS {
  CREATED = 'CREATED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

export const FINFLUX_DATE_FORMAT = 'yyyy-MM-dd';
export const FINFLUX_LOCALE = 'en';

export enum CB_ANALYSIS_STATUS {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const FF_BANK_STATEMENT_ANALYSIS_STATUS = {
  INITIALIZED: 'INITIALIZED',
  PROCESSING: 'PROCESSING',
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
};

export const FF_BANK_STATEMENT_ANALYSIS_STATUS_MAPPER = {
  [FF_BANK_STATEMENT_ANALYSIS_STATUS.INITIALIZED]: ANALYSIS_STATUS.CREATED,
  [FF_BANK_STATEMENT_ANALYSIS_STATUS.PROCESSING]: ANALYSIS_STATUS.PROCESSING,
  [FF_BANK_STATEMENT_ANALYSIS_STATUS.ACTIVE]: ANALYSIS_STATUS.COMPLETED,
  [FF_BANK_STATEMENT_ANALYSIS_STATUS.CANCELLED]: ANALYSIS_STATUS.CANCELLED,
};

export const FINFLUX_AUTH_TOKEN_URL = '/fineract-provider/api/oauth/token';

export const FINFLUX_DL_REPORTS_URL = '/fineract-provider/api/v1/runreports';

export const FINFLUX_LOAN_APPLICATION_REFERENCES_URL =
  '/fineract-provider/api/v1/loanapplicationreferences';

export const FINFLUX_ADVANCE_SEARCH_URL =
  '/fineract-provider/api/v1/search/advsearch';

export const FINFLUX_LOAN_ACCOUNT_URL = '/fineract-provider/api/v1/loans';

export const FINFLUX_CLIENTS_URL = '/fineract-provider/api/v1/clients';

export const FINFLUX_PROVIDER_URL = '/fineract-provider/api/v1';

export const FINFLUX_PROVIDER_URL_V2 = '/fineract-provider/api/v2';

export const FINFLUX_LOAN_APPLICATION_URL =
  '/fineract-provider/api/v1/loanapplication';

export const FINFLUX_CB_CLIENT_ENQUIRY_URL =
  '/fineract-provider/api/v1/enquiry/creditbureau/client';

export const FINFLUX_BANK_STATEMENT_ANALYSIS =
  '/fineract-provider/api/v1/bank-statement-analysis';

export const FINFLUX_TASKS_URL_V1 = '/fineract-provider/api/v1/tasks';

// Data tables
export const FINFLUX_CLIENT_ADDITIONAL_INFO_URL =
  '/fineract-provider/api/v1/datatables/dl_client_additional_info/';

export const FINFLUX_IDENTIFIER_ADDITIONAL_INFO_URL =
  '/fineract-provider/api/v1/datatables/dl_identifier_additional_info/';

export const FINFLUX_ADDRESS_ADDITIONAL_INFO_URL =
  '/fineract-provider/api/v1/datatables/dl_address_additional_info';

export const FINFLUX_KYC_ATTEMPT_INFO_URL =
  '/fineract-provider/api/v1/datatables/dl_client_kyc_attempt';

export const FINFLUX_CLIENT_FINANCIAL_ANALYSIS_URL =
  '/fineract-provider/api/v1/datatables/dl_api_client_financial_analysis';

export const FINFLUX_CLIENT_CONSENT_URL =
  '/fineract-provider/api/v1/datatables/dl_client_consent';

export const FINFLUX_CLIENT_BANK_ACCOUNT_ADDITIONAL_INFO_URL =
  '/fineract-provider/api/v1/datatables/dl_api_bank_accounts_additional_info';

export const FINFLUX_CLIENT_MANDATE_URL =
  '/fineract-provider/api/v1/datatables/dl_mandate';

export const FINFLUX_CLIENT_VIDEO_KYC_URL =
  '/fineract-provider/api/v1/datatables/dl_video_kyc';

export const FINFLUX_LOAN_E_SIGN_STATUS_URL =
  '/fineract-provider/api/v1/datatables/dl_esign_status';

// Workflow

export const FINFLUX_PINCODE_URL = '/fineract-provider/api/v1/masters/pincode';
export const FINFLUX_WORKFLOW_NAMES = {
  E_SIGN: 'Custom eSign',
};

export const LOAN_SIGNED_DOCUMENT_TAG = 'Signed';
export const FINFLUX_WORKFLOW_COMPLETED_STATUS = 'completed';