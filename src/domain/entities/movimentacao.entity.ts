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
    @Column
    contaOrigemId: string;

    @ForeignKey(() => ContaBancaria)
    @Column
    contaDestinoId?: string;

    @BelongsTo(() => ContaBancaria, 'contaOrigemId')  // Relacionamento de ContaOrigem
    contaOrigem: ContaBancaria;

    @BelongsTo(() => ContaBancaria, 'contaDestinoId')  // Relacionamento de ContaDestino
    contaDestino?: ContaBancaria;
}
