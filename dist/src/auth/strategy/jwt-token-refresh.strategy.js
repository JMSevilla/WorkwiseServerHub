"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtRefreshTokenStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshTokenStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("@nestjs/common");
const accounts_service_1 = require("../../logic/backoffice/accounts/accounts.service");
let JwtRefreshTokenStrategy = JwtRefreshTokenStrategy_1 = class JwtRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh-token') {
    constructor(jwtService, accountsService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secret'
        });
        this.jwtService = jwtService;
        this.accountsService = accountsService;
        this.logger = new common_2.Logger(JwtRefreshTokenStrategy_1.name);
        this.logger.warn('JwtRefreshTokenStrategy initialized');
    }
    async validate(payload) {
        this.logger.warn(`Payload: ${JSON.stringify(payload)}`);
        const user = await this.accountsService.findOne(payload.sub);
        if (!user) {
            this.logger.error('User not found.');
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy;
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy = JwtRefreshTokenStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        accounts_service_1.AccountsService])
], JwtRefreshTokenStrategy);
//# sourceMappingURL=jwt-token-refresh.strategy.js.map