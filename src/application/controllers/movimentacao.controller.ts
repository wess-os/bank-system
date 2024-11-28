import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Movimentacao } from '../../domain/entities/movimentacao.entity';
import { MovimentacaoService } from '../../domain/services/movimentacao.service';

@Controller('movimentacoes')
export class MovimentacaoController {
    constructor(private movimentacaoService: MovimentacaoService) { }

    @Post('deposito')
    async realizarDeposito(
        @Body('contaId') contaId: string,
        @Body('valor') valor: number,
    ): Promise<Movimentacao> {
        return this.movimentacaoService.realizarDeposito(contaId, valor);
    }

    @Post('saque')
    async realizarSaque(
        @Body('contaId') contaId: string,
        @Body('valor') valor: number,
    ): Promise<Movimentacao> {
        return this.movimentacaoService.realizarSaque(contaId, valor);
    }

    @Post('transferencia')
    async realizarTransferencia(
        @Body('contaOrigemId') contaOrigemId: string,
        @Body('contaDestinoId') contaDestinoId: string,
        @Body('valor') valor: number,
    ): Promise<Movimentacao> {
        return this.movimentacaoService.realizarTransferencia(
            contaOrigemId,
            contaDestinoId,
            valor,
        );
    }

    @Get('conta/:id')
    async obterMovimentacoes(@Param('id') contaId: string): Promise<Movimentacao[]> {
        return this.movimentacaoService.obterMovimentacoes(contaId);
    }
}