import { ContaBancaria } from '../entities/conta-bancaria.entity';

export interface ContaBancariaRepository {
    create(conta: ContaBancaria): Promise<ContaBancaria>;
    update(conta: ContaBancaria): Promise<ContaBancaria>;
    findByPk(id: string): Promise<ContaBancaria | null>;
}