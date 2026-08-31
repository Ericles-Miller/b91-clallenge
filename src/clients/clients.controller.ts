import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from '@prisma/client';

@Controller('clients')
@ApiTags('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new client',
    description: 'Endpoint to create a new client in the system',
  })
  @ApiResponse({
    status: 201,
    description: 'Create user successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return await this.clientsService.create(createClientDto);
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return await this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client | null> {
    return await this.clientsService.findOne(id);
  }
}
