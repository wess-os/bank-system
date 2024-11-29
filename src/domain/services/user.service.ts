import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async register(user: User): Promise<User> {
        user.senha = await bcrypt.hash(user.senha, 10);
        return this.userRepository.create(user);
    }

    async login(email: string, senha: string): Promise<string> {
        const user = await this.userRepository.findOne(email);

        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
        }

        const payload = { sub: user.id, email: user.email };

        return this.jwtService.sign(payload);
    }
}
