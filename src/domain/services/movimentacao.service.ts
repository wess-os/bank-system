import { Inject, Injectable } from '@nestjs/common';
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
        const conta = await this.contaBancariaService.obterConta(contaId);
        if (!conta || !conta.status) {
            throw new Error('Conta inválida ou inativa');
        }
        conta.saldoInicial += valor;
        await this.contaBancariaService.update(conta);
        const movimentacao = new Movimentacao({
            dataHora: new Date(),
            tipo: TipoMovimentacao.DEPOSITO,
            valor,
            contaOrigem: conta,
        });
        return this.movimentacaoRepository.create(movimentacao);
    }

    async realizarSaque(contaId: string, valor: number): Promise<Movimentacao> {
        const conta = await this.contaBancariaService.obterConta(contaId);
        if (!conta || !conta.status || conta.saldoInicial < valor) {
            throw new Error('Conta inválida, inativa ou saldo insuficiente');
        }
        conta.saldoInicial -= valor;
        await this.contaBancariaService.update(conta);
        const movimentacao = new Movimentacao({
            dataHora: new Date(),
            tipo: TipoMovimentacao.SAQUE,
            valor,
            contaOrigem: conta,
        });
        return this.movimentacaoRepository.create(movimentacao);
    }

    async realizarTransferencia(
        contaOrigemId: string,
        contaDestinoId: string,
        valor: number,
    ): Promise<Movimentacao> {
        const contaOrigem = await this.contaBancariaService.obterConta(contaOrigemId);
        const contaDestino = await this.contaBancariaService.obterConta(contaDestinoId);
        if (
            !contaOrigem ||
            !contaDestino ||
            !contaOrigem.status ||
            !contaDestino.status ||
            contaOrigem.saldoInicial < valor
        ) {
            throw new Error('Contas inválidas, inativas ou saldo insuficiente');
        }
        contaOrigem.saldoInicial -= valor;
        contaDestino.saldoInicial += valor;
        await this.contaBancariaService.update(contaOrigem);
        await this.contaBancariaService.update(contaDestino);
        const movimentacao = new Movimentacao({
            dataHora: new Date(),
            tipo: TipoMovimentacao.TRANSFERENCIA,
            valor,
            contaOrigem,
            contaDestino,
        });
        return this.movimentacaoRepository.create(movimentacao);
    }

    async obterMovimentacoes(contaId: string): Promise<Movimentacao[]> {
        return this.movimentacaoRepository.findByContaId(contaId);
    }

    // Outros métodos de serviço de domínio
}