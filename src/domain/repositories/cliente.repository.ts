import { Cliente } from '../entities/cliente.entity';

export interface ClienteRepository {
    create(cliente: Cliente): Promise<Cliente>;
    findByPk(id: string): Promise<Cliente | null>;
    findByCpf(cpf: string): Promise<Cliente | null>;
}