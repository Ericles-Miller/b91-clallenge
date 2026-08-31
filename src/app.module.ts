import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [PrismaModule, ClientsModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
