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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_token_refresh_strategy_1 = require("./strategy/jwt-token-refresh.strategy");
const refresh_token_ids_storage_1 = require("./refresh-token-ids-storage");
const accounts_entity_1 = require("../logic/backoffice/accounts/entities/accounts.entity");
const accounts_service_1 = require("../logic/backoffice/accounts/accounts.service");
let AuthService = class AuthService {
    constructor(accountsRepository, jwtService, accountsService, configService, refreshTokenIdsStorage) {
        this.accountsRepository = accountsRepository;
        this.jwtService = jwtService;
        this.accountsService = accountsService;
        this.configService = configService;
        this.refreshTokenIdsStorage = refreshTokenIdsStorage;
        this.logger = new common_1.Logger(jwt_token_refresh_strategy_1.JwtRefreshTokenStrategy.name);
    }
    async signIn(signInDto) {
        const user = await this.validateUser(signInDto.username, signInDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const payload = { sub: user.id, username: user.username };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1d'
        });
        await this.refreshTokenIdsStorage.insert(user.id, refreshToken);
        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }
    async validateUser(username, password) {
        const user = await this.accountsService.findByUsername(username);
        if (user && (await user.validatePassword(password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async refreshAccessToken(refreshToken) {
        try {
            const decoded = await this.jwtService.verifyAsync(refreshToken);
            await this.refreshTokenIdsStorage.validate(decoded.sub, refreshToken);
            const payload = { sub: decoded.sub, username: decoded.username };
            const accessToken = await this.jwtService.signAsync(payload);
            return { access_token: accessToken };
        }
        catch (error) {
            this.logger.error(`Error: ${error.message}`);
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async invalidateToken(access_token) {
        try {
            const decoded = await this.jwtService.verifyAsync(access_token);
            await this.refreshTokenIdsStorage.invalidate(decoded.sub);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid access token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(accounts_entity_1.Accounts)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService,
        accounts_service_1.AccountsService,
        config_1.ConfigService,
        refresh_token_ids_storage_1.RefreshTokenIdsStorage])
], AuthService);
//# sourceMappingURL=auth.service.js.map