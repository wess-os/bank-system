import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Cliente } from './cliente.entity';
import { Movimentacao } from './movimentacao.entity';

@Table
export class ContaBancaria extends Model<ContaBancaria> {
    @Column
    numero: string;

    @Column(DataType.FLOAT)
    saldoInicial: number;

    @Column
    status: boolean;

    @ForeignKey(() => Cliente)
    @Column(DataType.INTEGER)
    clienteId: number;

    @ForeignKey(() => Movimentacao)
    @Column
    movimentacaoId: string;

    // Relacionamentos
    cliente: Cliente;
    movimentacoes: Movimentacao[];
}
