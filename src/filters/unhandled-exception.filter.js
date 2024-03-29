"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnhandledExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var logger_service_1 = require("../logger/logger.service");
var custom_http_exception_1 = require("../exceptions/custom-http.exception");
var response_messages_constants_1 = require("../constants/response-messages.constants");
var response_model_1 = require("../models/response.model");
var custom_http_exception_filter_1 = require("./custom-http-exception.filter");
var UnhandledExceptionFilter = function () {
    var _classDecorators = [(0, common_1.Catch)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UnhandledExceptionFilter = _classThis = /** @class */ (function () {
        function UnhandledExceptionFilter_1() {
            this.logNameSpace = "Filters.".concat(custom_http_exception_filter_1.CustomHttpExceptionFilter.name);
        }
        UnhandledExceptionFilter_1.prototype.catch = function (exception, host) {
            var ctx = host.switchToHttp();
            var response = ctx.getResponse();
            if (exception instanceof custom_http_exception_1.CustomHttpException) {
                logger_service_1.Logger.warn(exception.logNameSpace, { data: exception });
                return response
                    .status(exception.httpCode)
                    .json(new response_model_1.ResponseModel(exception.data, exception.httpCode, exception.message));
            }
            if (exception instanceof common_1.HttpException) {
                var exceptionCopy = exception;
                logger_service_1.Logger.error(exceptionCopy, '', "".concat(this.logNameSpace, ".httpException"));
                if (exceptionCopy.status === common_1.HttpStatus.NOT_FOUND) {
                    return response
                        .status(common_1.HttpStatus.NOT_FOUND)
                        .json(new response_model_1.ResponseModel(null, response_messages_constants_1.ResponseMessages.NOT_FOUND.code, response_messages_constants_1.ResponseMessages.NOT_FOUND.message));
                }
                if (exceptionCopy.status === common_1.HttpStatus.BAD_REQUEST) {
                    return response
                        .status(common_1.HttpStatus.BAD_REQUEST)
                        .json(new response_model_1.ResponseModel(exceptionCopy.data, exceptionCopy.code, exceptionCopy.message));
                }
            }
            logger_service_1.Logger.error("".concat(this.logNameSpace, ".internalServerError"), '', exception);
            return response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new response_model_1.ResponseModel(null, response_messages_constants_1.ResponseMessages.SERVER_ERROR.code, response_messages_constants_1.ResponseMessages.SERVER_ERROR.message));
        };
        return UnhandledExceptionFilter_1;
    }());
    __setFunctionName(_classThis, "UnhandledExceptionFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UnhandledExceptionFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UnhandledExceptionFilter = _classThis;
}();
exports.UnhandledExceptionFilter = UnhandledExceptionFilter;
