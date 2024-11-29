import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { IsCpf } from 'src/utils/is-cpf.decorator';
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
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @IsString()
    nome: string;

    @Column
    @IsNotEmpty({ message: 'O CPF é obrigatório' })
    @IsCpf()
    cpf: string;

    @Column(DataType.DATE)
    @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
    @IsDate()
    dataNascimento: Date;

    @HasMany(() => ContaBancaria)
    contas: ContaBancaria[];
}
