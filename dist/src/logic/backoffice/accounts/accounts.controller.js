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
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("./accounts.service");
const create_account_dto_1 = require("./dto/create-account.dto");
const verification_dto_1 = require("../../../utils/schemas/verification.dto");
let AccountsController = class AccountsController {
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    async _checkAccountsBackOffice() {
        const result = await this.accountsService._checkAccountExistency();
        return { data: result };
    }
    async _checkAccountsEmail(email) {
        const result = await this.accountsService._check_email(email);
        return {
            data: result
        };
    }
    async create_account(body) {
        const result = await this.accountsService.__create__accountsetup(body);
        return result;
    }
    async createVerification(body) {
        const result = await this.accountsService.createVerification(body);
        return result;
    }
};
exports.AccountsController = AccountsController;
__decorate([
    (0, common_1.Get)('check-accounts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "_checkAccountsBackOffice", null);
__decorate([
    (0, common_1.Put)('check'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "_checkAccountsEmail", null);
__decorate([
    (0, common_1.Post)('account-creation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_dto_1.CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "create_account", null);
__decorate([
    (0, common_1.Post)('create-verification'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verification_dto_1.VerificationDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "createVerification", null);
exports.AccountsController = AccountsController = __decorate([
    (0, common_1.Controller)('api/v1/accounts'),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsController);
//# sourceMappingURL=accounts.controller.js.map