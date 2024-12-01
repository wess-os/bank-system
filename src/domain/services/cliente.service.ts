import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { SequelizeClienteRepository } from 'src/infrastructure/repositories/sequelize/cliente.repository';
import { validarCpf } from '../validators/is-cpf.decorator';

@Injectable()
export class ClienteService {
    constructor(
        private clienteRepository: SequelizeClienteRepository,
    ) { }

    async criarCliente(cliente: Cliente): Promise<Cliente> {
        try {
            if (!cliente.nome) {
                throw new HttpException('O nome é obrigatório', HttpStatus.BAD_REQUEST);
            }

            if (!cliente.cpf) {
                throw new HttpException('O CPF é obrigatório', HttpStatus.BAD_REQUEST);
            }

            if (!validarCpf(cliente.cpf)) {
                throw new HttpException('CPF inválido', HttpStatus.BAD_REQUEST);
            }

            if (!cliente.dataNascimento) {
                throw new HttpException('A data de nascimento é obrigatória', HttpStatus.BAD_REQUEST);
            }

            const clienteExistente = await this.clienteRepository.findByCpf(cliente.cpf);

            if (clienteExistente) {
                throw new HttpException('CPF já está cadastrado', HttpStatus.CONFLICT);
            }

            return this.clienteRepository.create(cliente);
        } catch (error) {
            throw new HttpException('Houve um erro ao criar o cliente: ' + error.message, HttpStatus.BAD_REQUEST);
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
            throw new HttpException('Houve um erro ao procurar o cliente: ' + error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
