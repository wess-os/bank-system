import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { ClienteRepository } from '../repositories/cliente.repository';

@Injectable()
export class ClienteService {
    constructor(
        @Inject('ClienteRepository')
        private clienteRepository: ClienteRepository,
    ) { }

    async criarCliente(cliente: Cliente): Promise<Cliente> {
        try {
            return this.clienteRepository.create(cliente);
        } catch (error) {
            throw new HttpException('Houve um erro ao criar o cliente', HttpStatus.BAD_REQUEST);
        }
    }

    async obterCliente(id: string): Promise<Cliente | null> {
        try {
            const cliente = await this.clienteRepository.findByPk(id);

            if (!cliente) {
                throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
            }

            return cliente;
        } catch (error) {
            throw new HttpException('Houve um erro ao procurar o cliente', HttpStatus.BAD_REQUEST);
        }
    }
}
