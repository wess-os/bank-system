import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Movimentacao } from '../../domain/entities/movimentacao.entity';
import { MovimentacaoService } from '../../domain/services/movimentacao.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('movimentacoes')
export class MovimentacaoController {
    constructor(private movimentacaoService: MovimentacaoService) { }

    @UseGuards(JwtAuthGuard)
    @Post('deposito')
    async realizarDeposito(
        @Body('contaId') contaId: string,
        @Body('valor') valor: number,
    ): Promise<Movimentacao> {
        return this.movimentacaoService.realizarDeposito(contaId, valor);
    }

    @UseGuards(JwtAuthGuard)
    @Post('saque')
    async realizarSaque(
        @Body('contaId') contaId: string,
        @Body('valor') valor: number,
    ): Promise<Movimentacao> {
        return this.movimentacaoService.realizarSaque(contaId, valor);
    }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Get('conta/:id')
    async obterMovimentacoes(@Param('id') contaId: string): Promise<Movimentacao[]> {
        return this.movimentacaoService.obterMovimentacoes(contaId);
    }
}