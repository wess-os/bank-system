import { Module } from '@nestjs/common';
import { SequelizeModule as NestSequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt'; // Importe o JwtModule
import { ClienteController } from '../../application/controllers/cliente.controller';
import { ClienteService } from '../../domain/services/cliente.service';
import { SequelizeClienteRepository } from '../../infrastructure/repositories/sequelize/cliente.repository';
import { Cliente } from '../../domain/entities/cliente.entity';

@Module({
    imports: [
        NestSequelizeModule.forFeature([Cliente]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [ClienteController],
    providers: [
        ClienteService,
        SequelizeClienteRepository,
    ],
    exports: [ClienteService],
})

export class ClienteModule { }
