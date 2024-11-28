import { Module } from '@nestjs/common';
import { SequelizeModule as NestSequelizeModule } from '@nestjs/sequelize';
import { MovimentacaoController } from '../../application/controllers/movimentacao.controller';
import { MovimentacaoService } from '../../domain/services/movimentacao.service';
import { SequelizeMovimentacaoRepository } from '../../infrastructure/repositories/sequelize/movimentacao.repository';
import { Movimentacao } from '../../domain/entities/movimentacao.entity';
import { ContaBancariaModule } from './conta-bancaria.module';

@Module({
    imports: [NestSequelizeModule.forFeature([Movimentacao]), ContaBancariaModule],
    controllers: [MovimentacaoController],
    providers: [
        MovimentacaoService,
        SequelizeMovimentacaoRepository,
    ],
    exports: [MovimentacaoService],
})
export class MovimentacaoModule { }
