import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { ENUM_GENDER, ENUM_ROLES } from '../../../../constants';

export class QueryUserDto {

    @IsBoolean()
    @IsOptional()
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
    age?: number;
}