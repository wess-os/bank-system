import { Module } from '@nestjs/common';
import { SequelizeModule as NestSequelizeModule } from '@nestjs/sequelize';
import { ContaBancariaController } from '../../application/controllers/conta-bancaria.controller';
import { ContaBancariaService } from '../../domain/services/conta-bancaria.service';
import { SequelizeContaBancariaRepository } from '../../infrastructure/repositories/sequelize/conta-bancaria.repository';
import { ContaBancaria } from '../../domain/entities/conta-bancaria.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        NestSequelizeModule.forFeature([ContaBancaria]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [ContaBancariaController],
    providers: [
        ContaBancariaService,
        SequelizeContaBancariaRepository,
    ],
    exports: [ContaBancariaService],
})

export class ContaBancariaModule { }
