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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenIdsStorage = exports.InvalidatedRefreshTokenError = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
class InvalidatedRefreshTokenError extends Error {
}
exports.InvalidatedRefreshTokenError = InvalidatedRefreshTokenError;
let RefreshTokenIdsStorage = class RefreshTokenIdsStorage {
    constructor(configService) {
        this.configService = configService;
        this.storage = {};
    }
    onApplicationShutdown(signal) {
        return;
    }
    onApplicationBootstrap() {
        return;
    }
    async insert(userId, tokenId) {
        this.storage[this.getKey(userId)] = tokenId;
    }
    async validate(userId, tokenId) {
        const storedId = await this.storage[this.getKey(userId)];
        if (storedId !== tokenId) {
            throw new InvalidatedRefreshTokenError();
        }
        return storedId === tokenId;
    }
    async invalidate(userId) {
        delete this.storage[this.getKey(userId)];
    }
    getKey(userId) {
        return `user-${userId}`;
    }
};
exports.RefreshTokenIdsStorage = RefreshTokenIdsStorage;
exports.RefreshTokenIdsStorage = RefreshTokenIdsStorage = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RefreshTokenIdsStorage);
//# sourceMappingURL=refresh-token-ids-storage.js.map