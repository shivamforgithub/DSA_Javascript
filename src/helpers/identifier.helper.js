"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExternalId = void 0;
var getExternalId = function (partnerId, partnerCustomerId) {
    return "".concat(partnerId, "_").concat(partnerCustomerId);
};
exports.getExternalId = getExternalId;
