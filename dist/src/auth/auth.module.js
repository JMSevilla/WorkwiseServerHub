"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const refresh_token_ids_storage_1 = require("./refresh-token-ids-storage");
const local_strategy_1 = require("./strategy/local.strategy");
const jwt_token_refresh_strategy_1 = require("./strategy/jwt-token-refresh.strategy");
const accounts_module_1 = require("../logic/backoffice/accounts/accounts.module");
const accounts_entity_1 = require("../logic/backoffice/accounts/entities/accounts.entity");
const accounts_service_1 = require("../logic/backoffice/accounts/accounts.service");
const verification_entity_1 = require("../models/verification.entity");
const verification_service_1 = require("../logic/business/verification/verification.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            accounts_module_1.AccountsModule,
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([accounts_entity_1.Accounts, verification_entity_1.Verification]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secret',
                signOptions: { expiresIn: '1h' },
            })
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            accounts_service_1.AccountsService,
            verification_service_1.VerificationService,
            refresh_token_ids_storage_1.RefreshTokenIdsStorage,
            local_strategy_1.LocalStrategy,
            jwt_token_refresh_strategy_1.JwtRefreshTokenStrategy
        ],
        exports: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map