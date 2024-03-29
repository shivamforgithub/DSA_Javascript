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
exports.CustomNotFoundException = void 0;
var custom_http_exception_1 = require("./custom-http.exception");
var common_1 = require("@nestjs/common");
var CustomNotFoundException = /** @class */ (function (_super) {
    __extends(CustomNotFoundException, _super);
    function CustomNotFoundException(message, data, logNameSpace) {
        var _this = _super.call(this, message, common_1.HttpStatus.NOT_FOUND, data, logNameSpace) || this;
        _this.message = message;
        _this.data = data;
        _this.logNameSpace = logNameSpace;
        return _this;
    }
    return CustomNotFoundException;
}(custom_http_exception_1.CustomHttpException));
exports.CustomNotFoundException = CustomNotFoundException;
