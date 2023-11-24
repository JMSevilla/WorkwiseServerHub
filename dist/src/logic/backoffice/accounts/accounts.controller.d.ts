import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { VerificationDto } from 'src/utils/schemas/verification.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    _checkAccountsBackOffice(): Promise<{
        data: boolean;
    }>;
    _checkAccountsEmail(email: string): Promise<{
        data: {
            data: any;
            statusCode: import("@nestjs/common").HttpStatus;
        };
    }>;
    create_account(body: CreateAccountDto): Promise<{
        data: any;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    createVerification(body: VerificationDto): Promise<{
        data: any;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
