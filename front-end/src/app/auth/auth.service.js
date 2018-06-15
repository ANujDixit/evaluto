"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _this = this;
var http_1 = require('@angular/common/http');
var core_1 = require('@angular/core');
var decode = require('jwt-decode');
var rxjs_1 = require('rxjs');
var operators_1 = require('rxjs/operators');
var environment_1 = require('../../environments/environment');
var common_1 = require('../common/common');
var cache_service_1 = require('./cache.service');
var role_enum_1 = require('./role.enum');
exports.defaultAuthStatus = {
    isAuthenticated: false,
    userRole: role_enum_1.Role.None,
    userId: null,
    tenantId: null,
    tenantSlug: null
};
var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService() {
        _super.apply(this, arguments);
        this.readonly = authProvider;
    }
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}(cache_service_1.CacheService));
exports.AuthService = AuthService;
(function (email, password) {
    return rxjs_1.Observable < IServerAuthResponse >
        authStatus;
});
new rxjs_1.BehaviorSubject(this.getItem('authStatus') || exports.defaultAuthStatus);
constructor(private, httpClient, http_1.HttpClient);
{
    _super.call(this);
    this.authStatus.subscribe(function (authStatus) { return _this.setItem('authStatus', authStatus); });
    // Fake login function to simulate roles
    this.authProvider = this.fakeAuthProvider;
}
login(email, string, password, string);
rxjs_1.Observable < IAuthStatus > {
    this: .logout(),
    const: loginResponse = this.authProvider(email, password).pipe(operators_1.map(function (value) {
        _this.setToken(value.accessToken);
        return decode(value.accessToken);
    }), operators_1.catchError(common_1.transformError)),
    loginResponse: .subscribe(function (res) {
        _this.authStatus.next(res);
    }, function (err) {
        _this.logout();
        return rxjs_1.throwError(err);
    }),
    return: loginResponse
};
exampleAuthProvider(email, string, password, string);
rxjs_1.Observable < IServerAuthResponse > {
    return: this.httpClient.post(environment_1.environment.baseUrl + "/v1/login", {
        email: email,
        password: password
    })
};
fakeAuthProvider(email, string, password, string);
rxjs_1.Observable < IServerAuthResponse > {
    if: function () { } };
!email.toLowerCase().endsWith('@test.com');
{
    return rxjs_1.throwError('Failed to login! Email needs to end with @test.com.');
}
var authStatus = {
    isAuthenticated: true,
    userId: 'e4d1bc2ab25c',
    userRole: email.toLowerCase().includes('cashier')
        ? role_enum_1.Role.Admin
        : email.toLowerCase().includes('clerk')
            ? role_enum_1.Role.Admin
            : email.toLowerCase().includes('manager')
                ? role_enum_1.Role.Admin
                : role_enum_1.Role.None
};
var authResponse = {
    accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none'
    })
};
return rxjs_1.of(authResponse);
logout();
{
    this.clearToken();
    this.authStatus.next(exports.defaultAuthStatus);
}
setToken(jwt, string);
{
    this.setItem('jwt', jwt);
}
getDecodedToken();
IAuthStatus;
{
    return decode(this.getItem('jwt'));
}
getToken();
string;
{
    return this.getItem('jwt') || '';
}
clearToken();
{
    this.removeItem('jwt');
}
