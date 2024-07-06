import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res } from "@nestjs/common";
import UserService from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "src/auth/auth.service";
import { Response } from "express";
import { LoginUserDto } from "./dto/login-user.dto";
import { QueryUserDto } from "./dto/query-user.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService : UserService,
        private authService: AuthService
    ) {}

    @Get()
    findAlL(@Query() QueryUserDto: QueryUserDto)  {
        return this.userService.findAll(QueryUserDto);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    // @Get('/products/:id')
    // getAllProducts(@Param('id', ParseIntPipe) id: number) {
    //     return this.userService.getAllProducts(id);
    // }

    // @Get('/orders/:id')
    // getAllOrders(@Param('id', ParseIntPipe) id: number) {
    //     return this.userService.getAllOrders(id);
    // }

    @Put(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }

    @Post('login')
    async signIn(@Body() loginUserDto: LoginUserDto, @Res({passthrough:true}) res: Response) {
        return this.authService.signIn(loginUserDto, res);
    }
}
