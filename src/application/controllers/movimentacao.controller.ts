import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Movimentacao } from '../../domain/entities/movimentacao.entity';
import { MovimentacaoService } from '../../domain/services/movimentacao.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('movimentacoes')
export class MovimentacaoController {
    constructor(private movimentacaoService: MovimentacaoService) { }

    @UseGuards(JwtAuthGuard)
    @ApiTags('Movimentacao')
    @ApiBearerAuth('JwtAuthGuard')
    @Post('deposito')
    async realizarDeposito(
        @Body('contaDestinoId') contaDestinoId: string,
        @Body('valor') valor: number,
    ): Promise<Movimentacao> {
        return this.movimentacaoService.realizarDeposito(contaDestinoId, valor);
    }

    @UseGuards(JwtAuthGuard)
    @ApiTags('Movimentacao')
    @ApiBearerAuth('JwtAuthGuard')
    @Post('saque')
    async realizarSaque(
        @Body('contaOrigemId') contaOrigemId: string,
        @Body('valor') valor: number,
    ): Promise<Movimentacao> {
        return this.movimentacaoService.realizarSaque(contaOrigemId, valor);
    }

    @UseGuards(JwtAuthGuard)
    @ApiTags('Movimentacao')
    @ApiBearerAuth('JwtAuthGuard')
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
    @ApiTags('Movimentacao')
    @ApiBearerAuth('JwtAuthGuard')
    @Get('conta/:id')
    async obterMovimentacoes(@Param('id') contaId: string): Promise<Movimentacao[]> {
        return this.movimentacaoService.obterMovimentacoes(contaId);
    }
}