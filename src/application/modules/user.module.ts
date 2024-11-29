import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from '../../application/controllers/user.controller';
import { UserService } from '../../domain/services/user.service';
import { SequelizeUserRepository } from '../../infrastructure/repositories/sequelize/user.repository';
import { User } from '../../domain/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        SequelizeUserRepository,
    ],
    exports: [UserService],
})

export class UserModule { }
