"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseModel = void 0;
var ResponseModel = /** @class */ (function () {
    function ResponseModel(data, code, message) {
        this.code = code;
        this.message = message || null;
        this.data = data;
    }
    return ResponseModel;
}());
exports.ResponseModel = ResponseModel;
