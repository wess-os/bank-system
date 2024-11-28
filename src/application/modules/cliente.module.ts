import { Module } from '@nestjs/common';
import { SequelizeModule as NestSequelizeModule } from '@nestjs/sequelize';
import { ClienteController } from '../../application/controllers/cliente.controller';
import { ClienteService } from '../../domain/services/cliente.service';
import { SequelizeClienteRepository } from '../../infrastructure/repositories/sequelize/cliente.repository';
import { Cliente } from '../../domain/entities/cliente.entity';

@Module({
    imports: [NestSequelizeModule.forFeature([Cliente])],
    controllers: [ClienteController],
    providers: [
        ClienteService,
        SequelizeClienteRepository,
    ],
    exports: [ClienteService],
})
export class ClienteModule { }
