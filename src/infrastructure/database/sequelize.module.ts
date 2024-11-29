import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule as NestSequelizeModule } from '@nestjs/sequelize';
import { Cliente } from '../../domain/entities/cliente.entity';
import { ContaBancaria } from '../../domain/entities/conta-bancaria.entity';
import { Movimentacao } from '../../domain/entities/movimentacao.entity';
import { Sequelize } from 'sequelize-typescript';

@Module({
    imports: [
        NestSequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            autoLoadModels: true,
            synchronize: false,
            models: [Cliente, ContaBancaria, Movimentacao],
        }),
    ],
    exports: [NestSequelizeModule],
})

export class SequelizeModule implements OnModuleInit {
    constructor(private sequelize: Sequelize) { }

    async onModuleInit() {
        try {
            await this.sequelize.sync({ force: false });

            console.log('Banco de dados sincronizado!');
        } catch (error) {
            console.error('Erro ao sincronizar o banco de dados:', error);
        }
    }
}
