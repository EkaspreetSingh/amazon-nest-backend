import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Min } from "class-validator";
import { ENUM_GENDER, ENUM_ROLES } from '../../../../constants';
import { Transform } from "class-transformer";

export class QueryUserDto {

    // @IsBoolean()
    @IsOptional()
    // @Transform(({value})=>parseBool(value))
    isActive?: boolean;

    @IsOptional()
    @IsEnum(ENUM_ROLES, {
        message: 'Role must be either admin or user'
    })
    @IsNotEmpty()
    role?: ENUM_ROLES;

    @IsOptional()
    @IsEnum(ENUM_GENDER, {
        message: 'Gender must be either male or female'
    })
    gender?: ENUM_GENDER;

    @IsNumber ()
    @IsOptional()
    @Transform(({value})=>parseInt(value))
    age?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({value})=>parseInt(value))
    page?: number = 1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({value})=>parseInt(value))
    limit?: number = 10;
}