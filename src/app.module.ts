import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [PrismaModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
