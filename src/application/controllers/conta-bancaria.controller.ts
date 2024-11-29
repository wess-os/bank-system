import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ContaBancaria } from '../../domain/entities/conta-bancaria.entity';
import { ContaBancariaService } from '../../domain/services/conta-bancaria.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('contas')
export class ContaBancariaController {
    constructor(private contaBancariaService: ContaBancariaService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async criarConta(@Body() conta: ContaBancaria): Promise<ContaBancaria> {
        return this.contaBancariaService.criarConta(conta);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async atualizarStatus(
        @Param('id') id: string,
        @Body('status') status: boolean,
    ): Promise<ContaBancaria> {
        return this.contaBancariaService.atualizarStatus(id, status);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async obterConta(@Param('id') id: string): Promise<ContaBancaria | null> {
        return this.contaBancariaService.obterConta(id);
    }
}