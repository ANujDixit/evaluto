"use strict";
var CacheService = (function () {
    function CacheService() {
    }
    CacheService.prototype.getItem = function (key) {
        var data = localStorage.getItem(key);
        if (data && data !== 'undefined') {
            return JSON.parse(data);
        }
        return null;
    };
    CacheService.prototype.setItem = function (key, data) {
        if (typeof data === 'string') {
            localStorage.setItem(key, data);
        }
        localStorage.setItem(key, JSON.stringify(data));
    };
    CacheService.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
    };
    CacheService.prototype.clear = function () {
        localStorage.clear();
    };
    return CacheService;
}());
exports.CacheService = CacheService;
