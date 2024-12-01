import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Cliente } from '../../domain/entities/cliente.entity';
import { ClienteService } from '../../domain/services/cliente.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('clientes')
export class ClienteController {
    constructor(private clienteService: ClienteService) { }

    @UseGuards(JwtAuthGuard)
    @ApiTags('Cliente')
    @ApiBearerAuth('JwtAuthGuard')
    @Post()
    async criarCliente(@Body() cliente: Cliente): Promise<Cliente> {
        return this.clienteService.criarCliente(cliente);
    }

    @UseGuards(JwtAuthGuard)
    @ApiTags('Cliente')
    @ApiBearerAuth('JwtAuthGuard')
    @Get(':id')
    async obterCliente(@Param('id') id: string): Promise<Cliente | null> {
        return this.clienteService.obterCliente(id);
    }
}