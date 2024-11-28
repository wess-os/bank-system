import { Module } from '@nestjs/common';
import { SequelizeModule as NestSequelizeModule } from '@nestjs/sequelize';
import { ContaBancariaController } from '../../application/controllers/conta-bancaria.controller';
import { ContaBancariaService } from '../../domain/services/conta-bancaria.service';
import { SequelizeContaBancariaRepository } from '../../infrastructure/repositories/sequelize/conta-bancaria.repository';
import { ContaBancaria } from '../../domain/entities/conta-bancaria.entity';

@Module({
    imports: [NestSequelizeModule.forFeature([ContaBancaria])],
    controllers: [ContaBancariaController],
    providers: [
        ContaBancariaService,
        SequelizeContaBancariaRepository,
    ],
    exports: [ContaBancariaService],
})
export class ContaBancariaModule { }
