"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
var common_1 = require("@nestjs/common");
var response_messages_constants_1 = require("../constants/response-messages.constants");
var validation_constraints_constants_1 = require("../constants/validation-constraints.constants");
var ValidationException = /** @class */ (function (_super) {
    __extends(ValidationException, _super);
    function ValidationException(validationErrors) {
        var _this = _super.call(this, response_messages_constants_1.ResponseMessages.INVALID_REQUEST_PAYLOAD.message) || this;
        _this.validationErrors = validationErrors;
        return _this;
    }
    ValidationException.prototype.getErrorMessage = function () {
        try {
            return this.validationErrors && this.validationErrors.length
                ? this.formatErrors(this.validationErrors, '').slice(0, -2)
                : response_messages_constants_1.ResponseMessages.INVALID_REQUEST_PAYLOAD.message;
        }
        catch (error) {
            return error;
        }
    };
    ValidationException.prototype.formatErrors = function (errors, errorMessage) {
        var _this = this;
        if (!errors || errors.length === 0) {
            return errorMessage;
        }
        errors.forEach(function (error) {
            if (error.constraints !== undefined) {
                var errorConstraints = Object.keys(error.constraints);
                if (errorConstraints.includes(validation_constraints_constants_1.ValidationConstraints.IS_ARRAY)) {
                    errorMessage +=
                        error.constraints[validation_constraints_constants_1.ValidationConstraints.IS_ARRAY] + ', ';
                }
                else {
                    for (var _i = 0, errorConstraints_1 = errorConstraints; _i < errorConstraints_1.length; _i++) {
                        var property = errorConstraints_1[_i];
                        errorMessage += error.constraints[property] + ', ';
                    }
                }
            }
            errorMessage = _this.formatErrors(error.children, errorMessage);
        });
        return errorMessage;
    };
    return ValidationException;
}(common_1.BadRequestException));
exports.ValidationException = ValidationException;
