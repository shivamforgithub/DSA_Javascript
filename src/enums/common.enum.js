"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM_ENV = exports.MANDATE_STATUS = exports.MANDATE_TYPE = void 0;
var MANDATE_TYPE;
(function (MANDATE_TYPE) {
    MANDATE_TYPE["ENACH"] = "ENACH";
    MANDATE_TYPE["UPI"] = "UPI";
})(MANDATE_TYPE || (exports.MANDATE_TYPE = MANDATE_TYPE = {}));
var MANDATE_STATUS;
(function (MANDATE_STATUS) {
    MANDATE_STATUS["INITIATED"] = "INITIATED";
    MANDATE_STATUS["ACCEPTED"] = "ACCEPTED";
    MANDATE_STATUS["REJECTED"] = "REJECTED";
    MANDATE_STATUS["CANCELLED"] = "CANCELLED";
})(MANDATE_STATUS || (exports.MANDATE_STATUS = MANDATE_STATUS = {}));
var SYSTEM_ENV;
(function (SYSTEM_ENV) {
    SYSTEM_ENV["PRODUCTION"] = "production";
    SYSTEM_ENV["DEVELOPMENT"] = "development";
    SYSTEM_ENV["QA"] = "qa";
    SYSTEM_ENV["UAT"] = "uat";
    SYSTEM_ENV["LOCAL"] = "local";
})(SYSTEM_ENV || (exports.SYSTEM_ENV = SYSTEM_ENV = {}));
