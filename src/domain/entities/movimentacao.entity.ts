import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ContaBancaria } from './conta-bancaria.entity';
import { IsNotEmpty, IsDate, IsEnum, IsNumber } from 'class-validator';

export enum TipoMovimentacao {
    DEPOSITO = 'DEPOSITO',
    SAQUE = 'SAQUE',
    TRANSFERENCIA = 'TRANSFERENCIA',
}

@Table({ tableName: 'Movimentacao' })
export class Movimentacao extends Model<Movimentacao> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    id: number;

    @Column(DataType.DATE)
    @IsNotEmpty({ message: 'A data e hora da movimentação são obrigatórias' })
    @IsDate()
    dataHora: Date;

    @Column
    @IsNotEmpty({ message: 'O tipo de movimentação é obrigatório' })
    @IsEnum(TipoMovimentacao)
    tipo: TipoMovimentacao;

    @Column(DataType.FLOAT)
    @IsNotEmpty({ message: 'O valor da movimentação é obrigatório' })
    @IsNumber()
    valor: number;

    @ForeignKey(() => ContaBancaria)
    @Column({
        type: DataType.INTEGER,
    })
    contaOrigemId: number;

    @ForeignKey(() => ContaBancaria)
    @Column({
        type: DataType.INTEGER,
    })
    contaDestinoId: number;

    @BelongsTo(() => ContaBancaria, 'contaOrigemId')
    contaOrigem: ContaBancaria;

    @BelongsTo(() => ContaBancaria, 'contaDestinoId')
    contaDestino?: ContaBancaria;
}
