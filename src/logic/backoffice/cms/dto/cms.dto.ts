import {
    IsAlphanumeric,
    IsDate,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

export class CmsDto {
    @IsString()
    @IsNotEmpty()
    path: string;

    @IsString()
    @IsNotEmpty()
    contentKey: string

    @IsOptional()
    @IsInt()
    isAccountSetup: number

    @IsOptional()
    @IsInt()
    hasLoading: number

    @IsOptional()
    @IsInt()
    access: number
}