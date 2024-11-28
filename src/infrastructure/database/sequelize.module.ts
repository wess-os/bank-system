import { Module } from '@nestjs/common';
import { SequelizeModule as NestSequelizeModule } from '@nestjs/sequelize';
import { Cliente } from '../../domain/entities/cliente.entity';
import { ContaBancaria } from '../../domain/entities/conta-bancaria.entity';
import { Movimentacao } from '../../domain/entities/movimentacao.entity';

@Module({
    imports: [
        NestSequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'bank-system',
            autoLoadModels: true,
            synchronize: false,
            logging: console.log,
            models: [Cliente, ContaBancaria, Movimentacao],
        }),
    ],
    exports: [NestSequelizeModule],
})
export class SequelizeModule { }