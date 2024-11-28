import { Inject, Injectable } from '@nestjs/common';
import { ContaBancaria } from '../entities/conta-bancaria.entity';
import { ContaBancariaRepository } from '../repositories/conta-bancaria.repository';

@Injectable()
export class ContaBancariaService {
    constructor(
        @Inject('ContaBancariaRepository')
        private contaBancariaRepository: ContaBancariaRepository,
    ) { }

    async criarConta(conta: ContaBancaria): Promise<ContaBancaria> {
        // Gerar número da conta
        // Salvar conta no repositório
        return this.contaBancariaRepository.create(conta);
    }

    async atualizarStatus(id: string, status: boolean): Promise<ContaBancaria> {
        const conta = await this.contaBancariaRepository.findById(id);
        if (!conta) {
            throw new Error('Conta não encontrada');
        }
        conta.status = status;
        return this.contaBancariaRepository.update(conta); // Chama o método update no repositório
    }

    async obterConta(id: string): Promise<ContaBancaria | null> {
        return this.contaBancariaRepository.findById(id);
    }

    async update(conta: ContaBancaria): Promise<ContaBancaria> {
        return this.contaBancariaRepository.update(conta);
    }

    // Outros métodos de serviço de domínio
}
