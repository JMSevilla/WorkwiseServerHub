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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const accounts_entity_1 = require("./entities/accounts.entity");
const useCreateResponse_1 = require("../../../utils/hook/useCreateResponse");
const nodemailer = require("nodemailer");
const useGenerateOTP_1 = require("../../../utils/hook/useGenerateOTP");
const verification_entity_1 = require("../../../models/verification.entity");
let AccountsService = class AccountsService {
    constructor(accountsRepository, verificationRepository) {
        this.accountsRepository = accountsRepository;
        this.verificationRepository = verificationRepository;
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'devopsbyte60@gmail.com',
                pass: process.env.SECRET_KEY
            }
        });
    }
    async createVerification(verificationDto) {
        const { email } = verificationDto;
        const verification = new verification_entity_1.Verification();
        verification.code = parseInt((0, useGenerateOTP_1.useGenerateOTP)().generateOTP());
        verification.email = email;
        verification.isValid = 1;
        verification.resendCount = 1;
        verification.type = "email";
        await this.verificationRepository.save(verification);
        return (0, useCreateResponse_1.useResponse)().createResponse({
            message: 'success'
        }, 200);
    }
    async _check_email(email) {
        const result = await this.accountsRepository.findOne({ where: { email } });
        if (result) {
            return (0, useCreateResponse_1.useResponse)().createResponse({ message: 'Email already in use' }, 400);
        }
        else {
            const verificationRows = await this.verificationRepository.exist();
            if (verificationRows) {
                const checkVerification = await this.verificationRepository.findOne({
                    where: { email: email, isValid: 1 }
                });
                if (checkVerification.resendCount != 3) {
                    checkVerification.resendCount = checkVerification.resendCount + 1;
                    await this.verificationRepository.save(checkVerification);
                    await this.sendEmail(email, "OTP Code", `Kindly use OTP Code to activate account : ${(0, useGenerateOTP_1.useGenerateOTP)().generateOTP()}`);
                }
                else {
                    return (0, useCreateResponse_1.useResponse)().createResponse({ message: 'Maximum sent email' }, 402);
                }
            }
            else {
                return (0, useCreateResponse_1.useResponse)()
                    .createResponse({
                    message: 'post_new_verification'
                }, 201);
            }
        }
    }
    async sendEmail(to, subject, text) {
        await this.transporter.sendMail({
            from: 'devopsbyte60@gmail.com',
            to,
            subject,
            text
        });
        return (0, useCreateResponse_1.useResponse)().createResponse({
            message: "success"
        }, 200);
    }
    async _checkAccountExistency() {
        const result = this.accountsRepository.exist();
        return result;
    }
    async findByUsername(username) {
        return this.accountsRepository.findOne({ where: { username } });
    }
    async findOne(id) {
        const findOptions = {
            where: { id }
        };
        return this.accountsRepository.findOne(findOptions);
    }
    async __create__accountsetup(createAccountDto) {
        const { password, firstname, middlename, lastname, username, email, imgurl } = createAccountDto;
        const existingAccountByEmail = await this.accountsRepository.findOne({ where: { email } });
        const existingAccountByUsername = await this.accountsRepository.findOne({ where: { username } });
        if (existingAccountByEmail) {
            return (0, useCreateResponse_1.useResponse)().createResponse({ message: 'Email already in use' }, 400);
        }
        if (existingAccountByUsername) {
            return (0, useCreateResponse_1.useResponse)().createResponse({ message: 'Username already in use' }, 400);
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const account = new accounts_entity_1.Accounts();
        account.firstname = firstname;
        account.middlename = !middlename || middlename == null ? "N/A" : middlename;
        account.lastname = lastname;
        account.username = username;
        account.email = email;
        account.password = hashedPassword;
        account.access_level = 'admin';
        account.verified = 1;
        account.status = 1;
        account.imgurl = imgurl;
        this.accountsRepository.save(account);
        return (0, useCreateResponse_1.useResponse)().createResponse({
            message: "success"
        }, 200);
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(accounts_entity_1.Accounts)),
    __param(1, (0, typeorm_2.InjectRepository)(verification_entity_1.Verification)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map