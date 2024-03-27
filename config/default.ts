import * as dotenv from 'dotenv';
import { SYSTEM_ENV } from '../src/shared/enums/common.enum';
dotenv.config();

export const retryTimes = {
  numberOfRetries: 3,
  minTimeOut: 6000,
  factor: 3,
};

export const ENV_PARAMS = {
  env: process.env.ENV,
  version: process.env.VERSION,
  serverPort: process.env.SERVER_PORT,
  serverLogLevel: process.env.SERVER_LOG_LEVEL,
  dbConnectionString: process.env.DB_CONNECTION_STRING,
  tokenSecretKey: process.env.TOKEN_SECRET_KEY,
  finfluxUser: process.env.FINFLUX_USER,
  finfluxPassword: process.env.FINFLUX_PASSWORD,
  finfluxTenantId: process.env.FINFLUX_TENANT_ID,
  finfluxBaseUrl: process.env.FINFLUX_URL,
  finfluxClientSecret: process.env.FINFLUX_CLIENT_SECRET,
  gstServiceBaseUrl: process.env.GST_SERVICE_BASE_URL,
  gstServiceXApiKey: process.env.GST_SERVICE_X_API_KEY,
  karzaGstResultWebhookAuthToken: process.env.KARZA_WEBHOOK_AUTH_TOKEN,
  kycBaseUrl: process.env.KYC_BASE_URL,
  kycXApiKey: process.env.KYC_X_API_KEY,
  lightMoneyWebViewUrl: process.env.LIGHT_MONEY_WEBVIEW_URL,
  itrAnalysisBaseUrl: process.env.ITR_ANALYSIS_BASE_URL,
  itrAnalysisXApiKey: process.env.ITR_X_API_KEY,
  redisConnectionString: process.env.REDIS_CONNECTION_STRING,
  digioCorporateConfigId: process.env.DIGIO_CORPORATE_CONFIG_ID,
  digioClientId: process.env.DIGIO_CLIENT_ID,
  digioClientSecret: process.env.DIGIO_CLIENT_SECRET,
  digioBaseUrl: process.env.DIGIO_BASE_URL,
  digioWebhookSecret: process.env.DIGIO_WEBHOOK_SECRET,
  mandateWebhookAcceptedEventName:
    process.env.MANDATE_WEBHOOK_ACCEPTED_EVENT_NAME,
  mockVerifyUpiApi: process.env.MOCK_VERIFY_UPI_API,
  awsRegion: process.env.AWS_REGION,
  awsS3VideoKycBucket: process.env.AWS_S3_VIDEO_KYC_BUCKET,
  awsS3LosBucket: process.env.AWS_S3_LOS_BUCKET,
  generalAwsSqsQueueUrl: process.env.GENERAL_AWS_SQS_QUEUE_URL,
  generalAwsSnsTopicArn: process.env.GENERAL_AWS_SNS_TOPIC_ARN,
  generalAwsQueueConsumerInstances:
    process.env.GENERAL_AWS_QUEUE_CONSUMER_INSTANCES,
  repaymentAwsSqsQueueUrl: process.env.REPAYMENT_AWS_SQS_QUEUE_URL,
  repaymentAwsSnsTopicArn: process.env.REPAYMENT_AWS_SNS_TOPIC_ARN,
  repaymentAwsQueueConsumerInstances:
    process.env.REPAYMENT_AWS_QUEUE_CONSUMER_INSTANCES,
  repaymentFifoAwsSnsTopicArn: process.env.REPAYMENT_FIFO_AWS_SNS_TOPIC_ARN,
  kycAwsSnsTopicArn: process.env.KYC_SNS_TOPIC_ARN,
  kycAwsSqsQueueUrl: process.env.KYC_AWS_SQS_QUEUE_URL,
  kycAwsQueueConsumerInstances: process.env.KYC_AWS_QUEUE_CONSUMER_INSTANCES,
  digioCorporateAccountNumber: process.env.DIGIO_CORPORATE_ACCOUNT_NUMBER,
  awsDlqLightApiUrl: process.env.AWS_DLQ_LIGHT_API_URL,
  awsDlqLightApiConsumerInstances:
    process.env.AWS_DLQ_LIGHT_API_CONSUMER_INSTANCES,
  loanApplicationApproverEmail: process.env.LOAN_APPLICATION_APPROVER_EMAIL,
  lightSenderEmailAddress: process.env.LIGHT_SENDER_EMAIL_ADDRESS,
  lightStatusReportRecipients: process.env.LIGHT_STATUS_REPORT_RECIPIENTS,
  lightTechStatusReportRecipients:
    process.env.LIGHT_TECH_STATUS_REPORT_RECIPIENTS,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpEmailUser: process.env.SMTP_EMAIL_USER,
  smtpEmailPassword: process.env.SMTP_EMAIL_PASSWORD,
  hyperVergeBaseUrl: process.env.HYPERVERGE_BASE_URL,
  hyperVergeAppId: process.env.HYPERVERGE_APP_ID,
  hyperVergeAppKey: process.env.HYPERVERGE_APP_KEY,
  hyperVergeWorkflowId: process.env.HYPERVERGE_WORKFLOW_ID,
  smsServiceAuthKey: process.env.SMS_SERVICE_AUTH_KEY,
  videoKycInitiatedSmsTemplateId:
    process.env.VIDEO_KYC_INITIATED_SMS_TEMPLATE_ID,
  videoKycApprovedSmsTemplateId: process.env.VIDEO_KYC_APPROVED_SMS_TEMPLATE_ID,
  videoKycDeclinedSmsTemplateId: process.env.VIDEO_KYC_DECLINED_SMS_TEMPLATE_ID,
  hypervergeWebhookAuthorizationToken:
    process.env.HYPERVERGE_WEBHOOK_AUTHORIZATION_TOKEN,
  finfluxIdentifierTemplate: process.env.FINFLUX_IDENTIFIER_TEMPLATE,
  eSignLoanManagerIdentifier: process.env.E_SIGN_LOAN_MANAGER_IDENTIFIER,
  eSignLoanManagerName: process.env.E_SIGN_LOAN_MANAGER_NAME,
  eSignLoanManagerSignServerUrl:
    process.env.E_SIGN_LOAN_MANAGER_SIGN_SERVER_URL,
  adminAuthorizationKey: process.env.ADMIN_AUTHORIZATION_KEY,
  loginOTPTemplateId: process.env.LOGIN_OTP_SMS_TEMPLATE_ID,
  smsServiceUrl: process.env.SMS_SERVICE_URL,
  supportAuthorizationKey: process.env.SUPPORT_AUTHORIZATION_KEY,
  equifaxBaseUrl: process.env.EQUIFAX_BASE_URL,
  equifaxCreditBureauRequestData:
    process.env.EQUIFAX_CREDIT_BUREAU_REQUEST_DATA,
  lightMoneyEmailSignature: process.env.LIGHT_MONEY_EMAIL_SIGNATURE
    ? JSON.parse(process.env.LIGHT_MONEY_EMAIL_SIGNATURE)
    : {},
  cwaBaseUrl: process.env.CWA_BASE_URL,
  mandateMaximumAmount: process.env.MANDATE_MAXIMUM_AMOUNT,
  dataCleanupAllowedPartnerId: process.env.DATA_CLEANUP_ALLOWED_PARTNER_ID,
  crifBaseUrl: process.env.CRIF_BASE_URL,
  crifCreditBureauRequestData: process.env.CRIF_COMMERCIAL_BUREAU_REQUEST_DATA,
};

export const db = {
  synchronize: ENV_PARAMS.env.toLocaleLowerCase() === SYSTEM_ENV.LOCAL,
  poolsize: 10,
};
