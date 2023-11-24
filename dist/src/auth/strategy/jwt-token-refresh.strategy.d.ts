import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt-payload.interface';
import { AccountsService } from 'src/logic/backoffice/accounts/accounts.service';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly jwtService;
    private readonly accountsService;
    private readonly logger;
    constructor(jwtService: JwtService, accountsService: AccountsService);
    validate(payload: JwtPayload): Promise<any>;
}
export {};
