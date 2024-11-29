import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movimentacao } from '../../../domain/entities/movimentacao.entity';
import { MovimentacaoRepository } from '../../../domain/repositories/movimentacao.repository';
import { Op } from 'sequelize';

@Injectable()
export class SequelizeMovimentacaoRepository implements MovimentacaoRepository {
    constructor(
        @InjectModel(Movimentacao)
        private movimentacaoModel: typeof Movimentacao,
    ) { }

    async create(movimentacao: Movimentacao): Promise<Movimentacao> {
        return this.movimentacaoModel.create(movimentacao);
    }

    async findByContaId(contaId: string): Promise<Movimentacao[]> {
        return this.movimentacaoModel.findAll({
            where: {
                [Op.or]: [
                    { contaOrigemId: contaId },
                    { contaDestinoId: contaId },
                ],
            },
        });
    }
}
