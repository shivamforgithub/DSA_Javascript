"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationExceptionFormatter = void 0;
var response_messages_constants_1 = require("../constants/response-messages.constants");
var response_model_1 = require("../models/response.model");
var validationExceptionFormatter = function (exception) {
    return new response_model_1.ResponseModel(exception.validationErrors, response_messages_constants_1.ResponseMessages.INVALID_REQUEST_PAYLOAD.code, exception.getErrorMessage());
};
exports.validationExceptionFormatter = validationExceptionFormatter;
