import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { ContaBancaria } from './conta-bancaria.entity';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { IsCpf } from 'src/utils/is-cpf.decorator';

@Table
export class Cliente extends Model<Cliente> {
    @Column
    @IsNotEmpty()
    @IsString()
    nome: string;

    @Column
    @IsNotEmpty()
    @IsCpf()
    cpf: string;

    @Column(DataType.DATE)
    @IsNotEmpty()
    @IsDate()
    dataNascimento: Date;

    @HasMany(() => ContaBancaria)  // Relacionamento 1:N com ContaBancaria
    contas: ContaBancaria[];
}
