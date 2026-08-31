import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client } from '@prisma/client';

@Injectable()
export class ClientsService {
  constructor(private readonly repository: PrismaService) {}

  async create({ fantasyName, cnpj }: CreateClientDto): Promise<Client> {
    const cnpjExists = await this.repository.client.findFirst({ where: { cnpj } });
    if (cnpjExists) throw new BadRequestException('Cnpj already exists');

    return this.repository.client.create({ data: { fantasyName, cnpj } });
  }

  async findAll(): Promise<Client[]> {
    return await this.repository.client.findMany();
  }

  async findOne(id: string): Promise<Client | null> {
    return await this.repository.client.findFirst({ where: { id } });
  }
}
