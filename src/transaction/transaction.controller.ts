import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('transaction')
@ApiTags('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return await this.transactionService.create(createTransactionDto);
  }
}
