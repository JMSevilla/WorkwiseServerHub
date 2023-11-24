import { VerificationDto } from "src/utils/schemas/verification.dto";
import { CreateAccountDto } from "../backoffice/accounts/dto/create-account.dto";
import { Accounts } from "../backoffice/accounts/entities/accounts.entity";
export interface IAccountService {
    _checkAccountExistency(): Promise<boolean>;
    findByUsername(username: string): Promise<Accounts>;
    findOne(id: number): Promise<Accounts>;
    __create__accountsetup(createAccountDto: CreateAccountDto): any;
    sendEmail(to: string, subject: string, text: string): any;
    _check_email(email: string): any;
    createVerification(verificationDto: VerificationDto): any;
}
