import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Cliente } from '../../domain/entities/cliente.entity';
import { ClienteService } from '../../domain/services/cliente.service';

@Controller('clientes')
export class ClienteController {
    constructor(private clienteService: ClienteService) { }

    @Post()
    async criarCliente(@Body() cliente: Cliente): Promise<Cliente> {
        return this.clienteService.criarCliente(cliente);
    }

    @Get(':id')
    async obterCliente(@Param('id') id: string): Promise<Cliente | null> {
        console.log(id);
        return this.clienteService.obterCliente(id);
    }
}