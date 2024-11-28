import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ContaBancaria } from '../../domain/entities/conta-bancaria.entity';
import { ContaBancariaService } from '../../domain/services/conta-bancaria.service';

@Controller('contas')
export class ContaBancariaController {
    constructor(private contaBancariaService: ContaBancariaService) { }

    @Post()
    async criarConta(@Body() conta: ContaBancaria): Promise<ContaBancaria> {
        return this.contaBancariaService.criarConta(conta);
    }

    @Patch(':id')
    async atualizarStatus(
        @Param('id') id: string,
        @Body('status') status: boolean,
    ): Promise<ContaBancaria> {
        return this.contaBancariaService.atualizarStatus(id, status);
    }

    @Get(':id')
    async obterConta(@Param('id') id: string): Promise<ContaBancaria | null> {
        return this.contaBancariaService.obterConta(id);
    }
}