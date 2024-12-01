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
        conta.numero = this.gerarNumeroConta();
        return this.contaModel.create(conta);
    }

    async update(conta: ContaBancaria): Promise<ContaBancaria> {
        await conta.save();
        return conta;
    }

    async findByPk(id: string): Promise<ContaBancaria | null> {
        return this.contaModel.findByPk(id);
    }

    private gerarNumeroConta(): string {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    }
}
