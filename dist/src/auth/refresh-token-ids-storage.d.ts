import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class InvalidatedRefreshTokenError extends Error {
}
export declare class RefreshTokenIdsStorage implements OnApplicationBootstrap, OnApplicationShutdown {
    private configService;
    private storage;
    constructor(configService: ConfigService);
    onApplicationShutdown(signal?: string): void;
    onApplicationBootstrap(): void;
    insert(userId: number, tokenId: string): Promise<void>;
    validate(userId: number, tokenId: string): Promise<boolean>;
    invalidate(userId: number): Promise<void>;
    private getKey;
}
