import { JwtPayload } from '../jwt-payload.interface';
import { AccountsService } from 'src/logic/backoffice/accounts/accounts.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly accountsService;
    private readonly logger;
    constructor(accountsService: AccountsService);
    validate(payload: JwtPayload): Promise<any>;
}
export {};
