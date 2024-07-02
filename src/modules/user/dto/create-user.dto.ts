import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Min } from "class-validator";
import { ENUM_GENDER, ENUM_ROLES } from '../../../../constants';
import { Trim } from '../../../custom-pipes/trim-transformer'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Trim()
    firstName: string;

    @IsString()
    @IsOptional()
    @Trim()
    lastName?: string;

    @IsNotEmpty()
    @IsEmail()
    @Trim()
    email: string;   

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNo: string;

    @IsNotEmpty()
    @IsStrongPassword({minLength:7,})
    password: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsEnum(ENUM_ROLES, {
        message: 'Role must be either admin or user'
    })
    @IsNotEmpty()
    role: ENUM_ROLES;

    @IsEnum(ENUM_GENDER, {
        message: 'Gender must be either male or female'
    })
    gender: ENUM_GENDER;

    @IsNumber ()
    @Min(0)
    @IsOptional()
    age?: number;

    @IsString ()
    @IsOptional()
    address?: string;
    
    @IsString ()
    @IsOptional()
    occupation?: string;
}

