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
    @IsNotEmpty()
    nome: string;

    @Column({
        unique: true,
    })
    @IsEmail({})
    email: string;

    @Column
    @IsNotEmpty()
    @MinLength(6)
    senha: string;
}
