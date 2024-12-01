import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { IsCpf } from '../validators/is-cpf.decorator';
import { ContaBancaria } from './conta-bancaria.entity';

@Table
export class Cliente extends Model<Cliente> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    id: number;

    @Column
    @IsNotEmpty()
    @IsString()
    nome: string;

    @Column({
        unique: true,
    })
    @IsNotEmpty()
    @IsCpf()
    cpf: string;

    @Column(DataType.DATE)
    @IsNotEmpty()
    @IsDate()
    dataNascimento: Date;

    @HasMany(() => ContaBancaria)
    contas: ContaBancaria[];
}
