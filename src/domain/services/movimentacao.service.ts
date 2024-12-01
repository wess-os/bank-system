import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Movimentacao, TipoMovimentacao } from '../entities/movimentacao.entity';
import { ContaBancariaService } from './conta-bancaria.service';
import { SequelizeMovimentacaoRepository } from 'src/infrastructure/repositories/sequelize/movimentacao.repository';

@Injectable()
export class MovimentacaoService {
    constructor(
        private movimentacaoRepository: SequelizeMovimentacaoRepository,
        private contaBancariaService: ContaBancariaService,
    ) { }

    async realizarDeposito(contaDestinoId: string, valor: number): Promise<Movimentacao> {
        try {
            const contaDestino = await this.contaBancariaService.obterConta(contaDestinoId);

            if (!contaDestino) {
                throw new HttpException('Conta não encontrada', HttpStatus.BAD_REQUEST);
            }

            if (!contaDestino.status) {
                throw new HttpException('Conta inválida ou inativa', HttpStatus.BAD_REQUEST);
            }

            contaDestino.saldoInicial += valor;
            await contaDestino.save();

            const movimentacao = {
                dataHora: new Date(),
                tipo: TipoMovimentacao.DEPOSITO,
                valor,
                contaDestinoId: contaDestino.id,
            } as Movimentacao;

            return this.movimentacaoRepository.create(movimentacao);
        } catch (error) {
            throw new HttpException('Houve um erro ao realizar depósito: ' + error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async realizarSaque(contaOrigemId: string, valor: number): Promise<Movimentacao> {
        try {
            const contaOrigem = await this.contaBancariaService.obterConta(contaOrigemId);

            if (!contaOrigem) {
                throw new HttpException('Conta não encontrada', HttpStatus.BAD_REQUEST);
            }

            if (!contaOrigem.status || contaOrigem.saldoInicial < valor) {
                throw new HttpException('Conta inválida, inativa ou saldo insuficiente', HttpStatus.BAD_REQUEST);
            }

            contaOrigem.saldoInicial -= valor;
            await contaOrigem.save();

            const movimentacao = {
                dataHora: new Date(),
                tipo: TipoMovimentacao.SAQUE,
                valor,
                contaOrigemId: contaOrigem.id,
            } as Movimentacao;

            return this.movimentacaoRepository.create(movimentacao);
        } catch (error) {
            throw new HttpException('Houve um erro ao realizar saque: ' + error.message, HttpStatus.BAD_REQUEST);
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

            const movimentacao = {
                dataHora: new Date(),
                tipo: TipoMovimentacao.TRANSFERENCIA,
                valor,
                contaOrigemId: contaOrigem.id,
                contaDestinoId: contaDestino.id,
            } as Movimentacao;

            return this.movimentacaoRepository.create(movimentacao);
        } catch (error) {
            throw new HttpException('Houve um erro ao realizar transferência: ' + error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async obterMovimentacoes(contaId: string): Promise<Movimentacao[]> {
        try {
            const movimentacoes = await this.movimentacaoRepository.findByContaId(contaId);

            return movimentacoes;
        } catch (error) {
            throw new HttpException('Houve um erro ao obter as movimentações: ' + error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
