import { IsNotEmpty, IsStrongPassword, IsEmail } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;  
    
    @IsNotEmpty()
    @IsStrongPassword({minLength:7,})
    password: string;

}
