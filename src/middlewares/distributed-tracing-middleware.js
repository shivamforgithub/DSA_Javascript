"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributedTracingMiddleware = exports.getTracingId = exports.setTracingId = exports.distributedTracingNamespace = void 0;
var cls = require('cls-hooked');
var common_constant_1 = require("../constants/common.constant");
var uuid_1 = require("uuid");
exports.distributedTracingNamespace = cls.createNamespace('distributed-tracing');
var TRACING_ID_KEY = 'tracingId';
var setTracingId = function (tracingId) {
    exports.distributedTracingNamespace.set(TRACING_ID_KEY, tracingId);
};
exports.setTracingId = setTracingId;
var getTracingId = function () {
    return exports.distributedTracingNamespace.get(TRACING_ID_KEY);
};
exports.getTracingId = getTracingId;
var DistributedTracingMiddleware = function () {
    return function (req, res, next) {
        exports.distributedTracingNamespace.bindEmitter(req);
        exports.distributedTracingNamespace.bindEmitter(res);
        var tracingId = req.header(common_constant_1.TRACING_ID_HEADER_KEY) || (0, uuid_1.v4)();
        exports.distributedTracingNamespace.run(function () {
            (0, exports.setTracingId)(tracingId);
            next();
        });
    };
};
exports.DistributedTracingMiddleware = DistributedTracingMiddleware;
