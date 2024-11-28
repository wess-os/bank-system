import { Injectable, Inject } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { ClienteRepository } from '../repositories/cliente.repository';

@Injectable()
export class ClienteService {
    constructor(
        @Inject('ClienteRepository')
        private clienteRepository: ClienteRepository,
    ) { }

    async criarCliente(cliente: Cliente): Promise<Cliente> {
        return this.clienteRepository.create(cliente);
    }

    async obterCliente(id: string): Promise<Cliente | null> {
        try {
            console.log(this.clienteRepository.findById(id));
            return await this.clienteRepository.findById(id);
        } catch (error) {
            throw new Error('Erro ao buscar o cliente');
        }
    }
}
