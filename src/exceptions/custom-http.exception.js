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
exports.CustomHttpException = void 0;
var common_1 = require("@nestjs/common");
var CustomHttpException = /** @class */ (function (_super) {
    __extends(CustomHttpException, _super);
    function CustomHttpException(message, httpCode, data, logNameSpace, errorCode) {
        var _this = _super.call(this, message, httpCode) || this;
        _this.message = message;
        _this.httpCode = httpCode;
        _this.data = data;
        _this.logNameSpace = logNameSpace;
        _this.errorCode = errorCode;
        return _this;
    }
    return CustomHttpException;
}(common_1.HttpException));
exports.CustomHttpException = CustomHttpException;
