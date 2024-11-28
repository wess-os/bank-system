import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContaBancaria } from '../../../domain/entities/conta-bancaria.entity';
import { ContaBancariaRepository } from '../../../domain/repositories/conta-bancaria.repository';

@Injectable()
export class SequelizeContaBancariaRepository implements ContaBancariaRepository {
    constructor(
        @InjectModel(ContaBancaria)
        private contaModel: typeof ContaBancaria,
    ) { }

    async create(conta: ContaBancaria): Promise<ContaBancaria> {
        return this.contaModel.create(conta);
    }

    async update(conta: ContaBancaria): Promise<ContaBancaria> {
        await conta.save();  // O método save atualiza a entidade no Sequelize
        return conta;
    }

    async findById(id: string): Promise<ContaBancaria | null> {
        return this.contaModel.findByPk(id);
    }

    // Outros métodos de CRUD
}
