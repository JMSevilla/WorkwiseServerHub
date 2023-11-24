"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("../config/config.module");
const config_1 = require("@nestjs/config");
const accounts_module_1 = require("./logic/backoffice/accounts/accounts.module");
const accounts_entity_1 = require("./logic/backoffice/accounts/entities/accounts.entity");
const verification_module_1 = require("./logic/business/verification/verification.module");
const verification_entity_1 = require("./models/verification.entity");
const cms_entity_1 = require("./logic/backoffice/cms/entities/cms.entity");
const cms_module_1 = require("./logic/backoffice/cms/cms.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigurationModule,
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT, 10),
                password: process.env.POSTGRES_PASSWORD,
                username: 'postgres',
                entities: [accounts_entity_1.Accounts, verification_entity_1.Verification, cms_entity_1.Cms],
                database: process.env.POSTGRES_DATABASE,
                synchronize: true,
                logging: true
            }),
            config_1.ConfigModule.forRoot(),
            auth_module_1.AuthModule,
            accounts_module_1.AccountsModule,
            verification_module_1.VerificationModule,
            cms_module_1.CmsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map