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

    @Column({
        unique: true,
    })
    numero: string;

    @Column({
        type: DataType.FLOAT,
        defaultValue: 0,
    })
    saldoInicial: number;

    @Column
    @IsNotEmpty()
    status: boolean;

    @ForeignKey(() => Cliente)
    @Column(DataType.INTEGER)
    @IsNotEmpty()
    clienteId: number;

    @BelongsTo(() => Cliente)
    cliente: Cliente;

    @HasMany(() => Movimentacao)
    movimentacoes: Movimentacao[];
}
