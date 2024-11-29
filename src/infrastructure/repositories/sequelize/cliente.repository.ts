import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cliente } from '../../../domain/entities/cliente.entity';
import { ClienteRepository } from '../../../domain/repositories/cliente.repository';

@Injectable()
export class SequelizeClienteRepository implements ClienteRepository {
    constructor(
        @InjectModel(Cliente)
        private clienteModel: typeof Cliente,
    ) { }

    async create(cliente: Cliente): Promise<Cliente> {
        return this.clienteModel.create(cliente);
    }

    async findByPk(id: string): Promise<Cliente | null> {
        return await this.clienteModel.findByPk(id);
    }
}