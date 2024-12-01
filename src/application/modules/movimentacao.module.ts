import { Module } from '@nestjs/common';
import { SequelizeModule as NestSequelizeModule } from '@nestjs/sequelize';
import { MovimentacaoController } from '../../application/controllers/movimentacao.controller';
import { MovimentacaoService } from '../../domain/services/movimentacao.service';
import { SequelizeMovimentacaoRepository } from '../../infrastructure/repositories/sequelize/movimentacao.repository';
import { Movimentacao } from '../../domain/entities/movimentacao.entity';
import { ContaBancariaModule } from './conta-bancaria.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        NestSequelizeModule.forFeature([Movimentacao]),
        ContaBancariaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [MovimentacaoController],
    providers: [
        MovimentacaoService,
        SequelizeMovimentacaoRepository,
    ],
    exports: [MovimentacaoService],
})
export class MovimentacaoModule { }

