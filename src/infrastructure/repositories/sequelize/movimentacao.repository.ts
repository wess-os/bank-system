import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movimentacao } from '../../../domain/entities/movimentacao.entity';
import { MovimentacaoRepository } from '../../../domain/repositories/movimentacao.repository';
import { Op } from 'sequelize';  // Importando o Op para operadores do Sequelize

@Injectable()
export class SequelizeMovimentacaoRepository implements MovimentacaoRepository {
    constructor(
        @InjectModel(Movimentacao)
        private movimentacaoModel: typeof Movimentacao,
    ) { }

    async create(movimentacao: Movimentacao): Promise<Movimentacao> {
        return this.movimentacaoModel.create(movimentacao);
    }

    // Método para buscar movimentações por contaId, usando Op.or
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
