import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Movimentacao, TipoMovimentacao } from '../entities/movimentacao.entity';
import { ContaBancariaService } from './conta-bancaria.service';
import { MovimentacaoRepository } from '../repositories/movimentacao.repository';

@Injectable()
export class MovimentacaoService {
    constructor(
        @Inject('MovimentacaoRepository')
        private movimentacaoRepository: MovimentacaoRepository,
        private contaBancariaService: ContaBancariaService,
    ) { }

    async realizarDeposito(contaId: string, valor: number): Promise<Movimentacao> {
        try {
            const conta = await this.contaBancariaService.obterConta(contaId);

            if (!conta || !conta.status) {
                throw new HttpException('Conta inválida ou inativa', HttpStatus.BAD_REQUEST);
            }

            conta.saldoInicial += valor;
            await conta.save();

            const movimentacao = new Movimentacao({
                dataHora: new Date(),
                tipo: TipoMovimentacao.DEPOSITO,
                valor,
                contaOrigem: conta,
            });

            return this.movimentacaoRepository.create(movimentacao);
        } catch (error) {
            throw new HttpException('Houve um erro ao realizar depósito', HttpStatus.BAD_REQUEST);
        }
    }

    async realizarSaque(contaId: string, valor: number): Promise<Movimentacao> {
        try {
            const conta = await this.contaBancariaService.obterConta(contaId);

            if (!conta || !conta.status || conta.saldoInicial < valor) {
                throw new HttpException('Conta inválida, inativa ou saldo insuficiente', HttpStatus.BAD_REQUEST);
            }

            conta.saldoInicial -= valor;
            await conta.save();

            const movimentacao = new Movimentacao({
                dataHora: new Date(),
                tipo: TipoMovimentacao.SAQUE,
                valor,
                contaOrigem: conta,
            });

            return this.movimentacaoRepository.create(movimentacao);
        } catch (error) {
            throw new HttpException('Houve um erro ao realizar saque', HttpStatus.BAD_REQUEST);
        }
    }

    async realizarTransferencia(
        contaOrigemId: string,
        contaDestinoId: string,
        valor: number,
    ): Promise<Movimentacao> {
        try {
            const contaOrigem = await this.contaBancariaService.obterConta(contaOrigemId);
            const contaDestino = await this.contaBancariaService.obterConta(contaDestinoId);

            if (
                !contaOrigem ||
                !contaDestino ||
                !contaOrigem.status ||
                !contaDestino.status ||
                contaOrigem.saldoInicial < valor
            ) {
                throw new HttpException('Contas inválidas, inativas ou saldo insuficiente', HttpStatus.BAD_REQUEST);
            }

            contaOrigem.saldoInicial -= valor;
            contaDestino.saldoInicial += valor;

            await contaOrigem.save();
            await contaDestino.save();

            const movimentacao = new Movimentacao({
                dataHora: new Date(),
                tipo: TipoMovimentacao.TRANSFERENCIA,
                valor,
                contaOrigem,
                contaDestino,
            });

            return this.movimentacaoRepository.create(movimentacao);
        } catch (error) {
            throw new HttpException('Houve um erro ao realizar transferência', HttpStatus.BAD_REQUEST);
        }
    }

    async obterMovimentacoes(contaId: string): Promise<Movimentacao[]> {
        try {
            return this.movimentacaoRepository.findByContaId(contaId);
        } catch (error) {
            throw new HttpException('Houve um erro ao obter as movimentações', HttpStatus.BAD_REQUEST);
        }
    }
}
