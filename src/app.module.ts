import { Module } from '@nestjs/common';
import { SequelizeModule } from './infrastructure/database/sequelize.module';
import { ClienteModule } from './application/modules/cliente.module';
import { ContaBancariaModule } from './application/modules/conta-bancaria.module';
import { MovimentacaoModule } from './application/modules/movimentacao.module';
import { UserModule } from './application/modules/user.module';

@Module({
  imports: [
    SequelizeModule,
    ClienteModule,
    ContaBancariaModule,
    MovimentacaoModule,
    UserModule,
  ],
})
export class AppModule { }
