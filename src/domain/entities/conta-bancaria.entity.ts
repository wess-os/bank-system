import { Column, Model, Table, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Cliente } from './cliente.entity';
import { Movimentacao } from './movimentacao.entity';
import { IsNotEmpty } from 'class-validator';

@Table
export class ContaBancaria extends Model<ContaBancaria> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    id: number;

    @Column
    @IsNotEmpty({ message: 'O número da conta é obrigatório' })
    numero: string;

    @Column(DataType.FLOAT)
    @IsNotEmpty({ message: 'O saldo inicial é obrigatório' })
    saldoInicial: number;

    @Column
    @IsNotEmpty({ message: 'O status da conta é obrigatório' })
    status: boolean;

    @ForeignKey(() => Cliente)
    @Column(DataType.INTEGER)
    @IsNotEmpty({ message: 'O ID do cliente é obrigatório' })
    clienteId: number;

    @BelongsTo(() => Cliente)
    cliente: Cliente;

    @HasMany(() => Movimentacao)
    movimentacoes: Movimentacao[];
}
