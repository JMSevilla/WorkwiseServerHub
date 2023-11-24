import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { RefreshTokenIdsStorage } from './refresh-token-ids-storage';
import { Accounts } from 'src/logic/backoffice/accounts/entities/accounts.entity';
import { AccountsService } from 'src/logic/backoffice/accounts/accounts.service';
export declare class AuthService {
    private accountsRepository;
    private readonly jwtService;
    private readonly accountsService;
    private readonly configService;
    private readonly refreshTokenIdsStorage;
    private readonly logger;
    constructor(accountsRepository: Repository<Accounts>, jwtService: JwtService, accountsService: AccountsService, configService: ConfigService, refreshTokenIdsStorage: RefreshTokenIdsStorage);
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    validateUser(username: string, password: string): Promise<any>;
    refreshAccessToken(refreshToken: string): Promise<{
        access_token: string;
    }>;
    invalidateToken(access_token: string): Promise<void>;
}
