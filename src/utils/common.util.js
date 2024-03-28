"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJwt = void 0;
function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
exports.parseJwt = parseJwt;
