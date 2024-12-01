import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SequelizeUserRepository } from 'src/infrastructure/repositories/sequelize/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: SequelizeUserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async register(user: User): Promise<User> {
        try {
            if (!user.nome) {
                throw new HttpException('O nome é obrigatório', HttpStatus.BAD_REQUEST);
            }

            if (!user.email) {
                throw new HttpException('O email é obrigatório', HttpStatus.BAD_REQUEST);
            }

            if (!user.senha) {
                throw new HttpException('A senha é obrigatória', HttpStatus.BAD_REQUEST);
            }

            if (user.senha.length < 6) {
                throw new HttpException('A senha deve ter no mínimo 6 caracteres', HttpStatus.BAD_REQUEST);
            }

            user.senha = await bcrypt.hash(user.senha, 10);

            return this.userRepository.create(user);
        } catch (error) {
            throw new HttpException('Houve um erro ao criar o usuário: ' + error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async login(email: string, senha: string): Promise<string> {
        try {
            const user = await this.userRepository.findOne(email);

            if (!user || !(await bcrypt.compare(senha, user.senha))) {
                throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
            }

            const payload = { sub: user.id, email: user.email };

            return this.jwtService.sign(payload);
        } catch (error) {
            throw new HttpException('Houve um erro ao logar: ' + error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
