"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sensitiveAadhaarMaskConfig = exports.AADHAAR_URLS = exports.SENSITIVE_DATA_LOGS_MASK_INFO = exports.aadharMaskConfig = void 0;
var maskdata_1 = require("maskdata");
exports.aadharMaskConfig = {
    cardMaskOptions: {
        maskWith: 'X',
        unmaskedStartDigits: 0,
        unmaskedEndDigits: 4,
    },
    cardFields: ['aadhaarNumber', 'aadhaarNo'],
};
exports.SENSITIVE_DATA_LOGS_MASK_INFO = [
    {
        urlRegex: '^/v1/loan-applications/[0-9]+/aadhaar/send-otp$',
        maskUtility: maskdata_1.maskJSON2,
        maskOptions: exports.aadharMaskConfig,
    },
    {
        urlRegex: '^/v1/loan-applications/[0-9]+/aadhaar/verify-otp$',
        maskUtility: maskdata_1.maskJSON2,
        maskOptions: exports.aadharMaskConfig,
    },
    {
        urlRegex: '^/v2/loan-applications/[A-Za-z0-9_]+/aadhaar/verify-otp$',
        maskUtility: maskdata_1.maskJSON2,
        maskOptions: exports.aadharMaskConfig,
    },
    {
        urlRegex: '^/v2/loan-applications/[A-Za-z0-9_]+/aadhaar/send-otp$',
        maskUtility: maskdata_1.maskJSON2,
        maskOptions: exports.aadharMaskConfig,
    },
];
exports.AADHAAR_URLS = [
    '/v3/get-aadhaar-otp',
    '/v3/get-aadhaar-file',
    '/v3/aadhaar-consent',
    '/v3/aadhaar-xml/otp',
    '/v3/aadhaar-xml/file',
];
var sensitiveAadhaarMaskConfig = function () {
    var sensitiveAadhaardataMasking = [];
    exports.AADHAAR_URLS.forEach(function (url) {
        sensitiveAadhaardataMasking.push({
            urlRegex: url,
            maskUtility: maskdata_1.maskJSON2,
            maskOptions: exports.aadharMaskConfig,
        });
    });
    return sensitiveAadhaardataMasking;
};
exports.sensitiveAadhaarMaskConfig = sensitiveAadhaarMaskConfig;
