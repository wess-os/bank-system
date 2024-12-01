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
    @IsNotEmpty()
    @IsDate()
    dataHora: Date;

    @Column
    @IsNotEmpty()
    @IsEnum(TipoMovimentacao)
    tipo: TipoMovimentacao;

    @Column(DataType.FLOAT)
    @IsNotEmpty()
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
