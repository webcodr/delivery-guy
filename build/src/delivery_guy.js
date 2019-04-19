"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var DeliveryGuy = (function () {
    function DeliveryGuy() {
    }
    DeliveryGuy.prototype.request = function (url, body, userConfig) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headers, config;
            return tslib_1.__generator(this, function (_a) {
                headers = {};
                if (body && typeof body === 'object') {
                    body = JSON.stringify(body);
                    headers['content-type'] = 'application/json';
                }
                config = tslib_1.__assign({}, userConfig, { body: body,
                    headers: headers });
                return [2, fetch(url, config)];
            });
        });
    };
    DeliveryGuy.prototype.get = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.request(url)];
            });
        });
    };
    DeliveryGuy.prototype.post = function (url, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.request(url, payload, { method: 'POST' })];
            });
        });
    };
    DeliveryGuy.prototype.put = function (url, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.request(url, payload, { method: 'PUT' })];
            });
        });
    };
    DeliveryGuy.prototype.patch = function (url, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.request(url, payload, { method: 'PATCH' })];
            });
        });
    };
    DeliveryGuy.prototype.delete = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.request(url, null, { method: 'DELETE' })];
            });
        });
    };
    DeliveryGuy.prototype.head = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.request(url, null, { method: 'HEAD' })];
            });
        });
    };
    DeliveryGuy.prototype.options = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.request(url, null, { method: 'OPTIONS' })];
            });
        });
    };
    return DeliveryGuy;
}());
exports.default = DeliveryGuy;
//# sourceMappingURL=delivery_guy.js.map