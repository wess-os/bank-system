import { ContaBancaria } from '../entities/conta-bancaria.entity';

export interface ContaBancariaRepository {
    create(conta: ContaBancaria): Promise<ContaBancaria>;
    update(conta: ContaBancaria): Promise<ContaBancaria>;
    findById(id: string): Promise<ContaBancaria | null>;
    // Outros métodos de CRUD conforme necessário
}