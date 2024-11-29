import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { User } from '../../domain/entities/user.entity';

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() user: User): Promise<User> {
        return this.userService.register(user);
    }

    @Post('login')
    async login(@Body() body: { email: string; senha: string }): Promise<{ accessToken: string }> {
        const token = await this.userService.login(body.email, body.senha);

        return { accessToken: token };
    }
}
