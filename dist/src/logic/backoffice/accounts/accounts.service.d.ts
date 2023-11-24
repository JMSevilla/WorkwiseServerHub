import { Repository } from 'typeorm';
import { Accounts } from './entities/accounts.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { IAccountService } from '../../interfaces/IAccountService';
import { Verification } from 'src/models/verification.entity';
import { VerificationDto } from 'src/utils/schemas/verification.dto';
export declare class AccountsService implements IAccountService {
    private readonly accountsRepository;
    private readonly verificationRepository;
    private transporter;
    constructor(accountsRepository: Repository<Accounts>, verificationRepository: Repository<Verification>);
    createVerification(verificationDto: VerificationDto): Promise<{
        data: any;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    _check_email(email: string): Promise<{
        data: any;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    sendEmail(to: string, subject: string, text: string): Promise<{
        data: any;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    _checkAccountExistency(): Promise<boolean>;
    findByUsername(username: string): Promise<Accounts>;
    findOne(id: number): Promise<Accounts>;
    __create__accountsetup(createAccountDto: CreateAccountDto): Promise<{
        data: any;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
