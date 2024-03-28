"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMobileNumberFromJwtToken = exports.ApiLoggerMiddleware = exports.Logger = void 0;
var winston_1 = require("winston");
var rTracer = require("cls-rtracer");
var lodash_1 = require("lodash");
var express_winston_1 = require("express-winston");
var default_1 = require("../../config/default");
var request_method_enum_1 = require("../enums/request-method.enum");
var common_util_1 = require("../utils/common.util");
var moment = require("moment");
var maskdata_helper_1 = require("../helpers/maskdata.helper");
var identifier_helper_1 = require("../helpers/identifier.helper");
var distributed_tracing_middleware_1 = require("../middlewares/distributed-tracing-middleware");
var HEALTH_END_POINT = '/v1/users/health';
var OMITTED_KEYS_FROM_LOG_OBJECT = [
    'message',
    'level',
    'timestamp',
    'namespace',
    'meta',
    'meta.req',
    'meta.res',
    'error',
    'error_stack',
];
var CONFIGURED_LOG_LEVEL = default_1.ENV_PARAMS.serverLogLevel || 'info';
// @ts-ignore
var addCustomAttributesToLogObject = (0, winston_1.format)(function (info, opts) {
    var data = {
        correlation_id: rTracer.id(),
        tracingId: (0, distributed_tracing_middleware_1.getTracingId)(),
        level: info.level,
        timestamp: info.timestamp,
        message: info.message,
        type: opts.tag,
    };
    if (opts.tag === 'app') {
        return __assign(__assign(__assign({}, (0, lodash_1.omit)(info, OMITTED_KEYS_FROM_LOG_OBJECT)), data), { namespace: info.namespace, error: info.error, error_stack: info.error_stack, meta: info.meta });
    }
    else {
        var authTokenPayload = (0, common_util_1.parseJwt)((0, lodash_1.get)(info, 'meta.req.headers["authorization"]'));
        return __assign(__assign({}, (0, lodash_1.omit)(info, OMITTED_KEYS_FROM_LOG_OBJECT)), { log: __assign({}, data), req: __assign({ url: (0, lodash_1.get)(info, 'meta.req.url'), method: (0, lodash_1.get)(info, 'meta.req.method'), referer: (0, lodash_1.get)(info, 'meta.req.headers.referer'), userAgent: (0, lodash_1.get)(info, 'meta.req.headers["user-agent"]'), userIp: (0, lodash_1.get)(info, 'meta.req.headers["x-forwarded-for"]'), httpVersion: (0, lodash_1.get)(info, 'meta.req.httpVersion'), body: (0, lodash_1.get)(info, 'meta.req.body'), query: (0, lodash_1.get)(info, 'meta.req.query') }, (authTokenPayload && {
                userExternalId: (0, identifier_helper_1.getExternalId)(authTokenPayload.partnerId, authTokenPayload.partnerCustomerId),
                userId: getCustomerIdFromJwtToken((0, lodash_1.get)(info, 'meta.req.headers["authorization"]')),
                mobileNumber: authTokenPayload.mobileNumber,
            })), res: {
                body: (0, lodash_1.get)(info, 'meta.res.body'),
                statusCode: (0, lodash_1.get)(info, 'meta.res.statusCode'),
            } });
    }
});
var CONFIGURED_TRANSPORTS = [
    new winston_1.transports.Console({ level: CONFIGURED_LOG_LEVEL }),
];
var timezoned = function () {
    return moment().utcOffset('+05:30').format();
};
var AppLogger = /** @class */ (function () {
    function AppLogger() {
        this.logger = (0, winston_1.createLogger)({
            format: winston_1.format.combine(winston_1.format.timestamp({ format: timezoned }), addCustomAttributesToLogObject({ tag: 'app' }), winston_1.format.json()),
            transports: CONFIGURED_TRANSPORTS,
        });
    }
    AppLogger.prototype.info = function (namespace, meta) {
        this.logger.log("info", '', {
            namespace: namespace,
            meta: meta,
        });
    };
    AppLogger.prototype.error = function (namespace, error, meta) {
        this.logger.log("error", '', {
            namespace: namespace,
            error_stack: error instanceof Error ? error.stack : error,
            error: error,
            meta: meta,
        });
    };
    AppLogger.prototype.warn = function (namespace, meta) {
        this.logger.log("warn", '', {
            namespace: namespace,
            meta: meta,
        });
    };
    AppLogger.prototype.debug = function (namespace, meta) {
        this.logger.log("debug", '', {
            namespace: namespace,
            meta: meta,
        });
    };
    AppLogger.prototype.log = function (message, namespace) {
        this.logger.log("info", message, { namespace: namespace });
    };
    return AppLogger;
}());
exports.Logger = new AppLogger();
exports.ApiLoggerMiddleware = (0, express_winston_1.logger)({
    transports: CONFIGURED_TRANSPORTS,
    format: winston_1.format.combine(winston_1.format.timestamp({ format: timezoned }), addCustomAttributesToLogObject({ tag: 'access' }), winston_1.format.json()),
    expressFormat: true,
    requestWhitelist: __spreadArray(__spreadArray([], express_winston_1.requestWhitelist, true), ['body'], false),
    responseWhitelist: __spreadArray(__spreadArray([], express_winston_1.responseWhitelist, true), ['body'], false),
    requestFilter: function (req, propName) {
        if (propName === 'body') {
            var maskedData_1 = req.body;
            maskdata_helper_1.SENSITIVE_DATA_LOGS_MASK_INFO.forEach(function (info) {
                var _a;
                if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.match(info.urlRegex)) {
                    maskedData_1 = info.maskUtility(req.body, info.maskOptions);
                }
            });
            req[propName] = maskedData_1;
            return req[propName];
        }
        else {
            return req[propName];
        }
    },
    ignoreRoute: function (req) {
        var ignoredRoutes = [
            { method: request_method_enum_1.RequestMethod.GET, path: HEALTH_END_POINT },
        ];
        var isExcludedPath = function (request) {
            var routeInfo = {
                path: request.url,
                method: request_method_enum_1.RequestMethod[request.method],
            };
            return (ignoredRoutes.findIndex(function (route) {
                return (route.path === routeInfo.path && route.method === routeInfo.method);
            }) > -1);
        };
        return isExcludedPath(req);
    },
});
function getMobileNumberFromJwtToken(token) {
    try {
        var tokenSplits = token.split(' ');
        if ((tokenSplits === null || tokenSplits === void 0 ? void 0 : tokenSplits.length) && tokenSplits[0].trim().toLocaleLowerCase() === 'bearer') {
            var jwtToken = tokenSplits[1];
            var tokenPayload = (0, common_util_1.parseJwt)(jwtToken);
            return tokenPayload['mobileNumber'];
        }
    }
    catch (err) {
        return undefined;
    }
    return undefined; // undefined is returned intentionally to avoid logging null
}
exports.getMobileNumberFromJwtToken = getMobileNumberFromJwtToken;
function getCustomerIdFromJwtToken(token) {
    try {
        var tokenSplits = token.split(' ');
        if ((tokenSplits === null || tokenSplits === void 0 ? void 0 : tokenSplits.length) &&
            tokenSplits[0].trim().toLocaleLowerCase() === 'bearer') {
            var jwtToken = tokenSplits[1];
            var tokenPayload = (0, common_util_1.parseJwt)(jwtToken);
            /* tslint:disable:no-string-literal */
            return tokenPayload['userId'];
        }
    }
    catch (err) {
        return undefined;
    }
    return undefined; // undefined is returned intentionally to avoid logging null
}
