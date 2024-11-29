import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

@Table
export class User extends Model<User> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    id: number;

    @Column
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    nome: string;

    @Column({
        unique: true,
    })
    @IsEmail({}, { message: 'E-mail inválido' })
    email: string;

    @Column
    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    senha: string;
}
