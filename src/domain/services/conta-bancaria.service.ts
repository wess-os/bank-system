import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ContaBancaria } from '../entities/conta-bancaria.entity';
import { ContaBancariaRepository } from '../repositories/conta-bancaria.repository';

@Injectable()
export class ContaBancariaService {
    constructor(
        @Inject('ContaBancariaRepository')
        private contaBancariaRepository: ContaBancariaRepository,
    ) { }

    async criarConta(conta: ContaBancaria): Promise<ContaBancaria> {
        try {
            return this.contaBancariaRepository.create(conta);
        } catch (error) {
            throw new HttpException('Houve um erro ao criar conta', HttpStatus.BAD_REQUEST);
        }
    }

    async atualizarStatus(id: string, status: boolean): Promise<ContaBancaria> {
        try {
            const conta = await this.contaBancariaRepository.findByPk(id);

            if (!conta) {
                throw new HttpException('Conta não encontrada', HttpStatus.NOT_FOUND);
            }

            conta.status = status;
            await conta.save();

            return conta;
        } catch (error) {
            throw new HttpException('Houve um erro ao atualizar a conta', HttpStatus.BAD_REQUEST);
        }
    }

    async obterConta(id: string): Promise<ContaBancaria | null> {
        try {
            const conta = await this.contaBancariaRepository.findByPk(id);

            if (!conta) {
                throw new HttpException('Conta não encontrada', HttpStatus.NOT_FOUND);
            }

            return conta;
        } catch (error) {
            throw new HttpException('Houve um erro ao procurar a conta', HttpStatus.BAD_REQUEST);
        }
    }

    async update(conta: ContaBancaria): Promise<ContaBancaria> {
        try {
            return this.contaBancariaRepository.update(conta);
        } catch (error) {
            throw new HttpException('Houve um erro ao atualizar a conta', HttpStatus.BAD_REQUEST);
        }
    }
}
