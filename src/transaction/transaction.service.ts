import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { RiskRules, Transaction } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ETypeTransaction } from './enum/type-transaction.enum';
import { EStatusTransaction } from './enum/status-transaction.enum';
import { TransactionLevelDto } from './dto/transaction-level.dro';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ clientId, value, installment, typeTransaction }: CreateTransactionDto): Promise<Transaction> {
    let riskRules: RiskRules | null = null;
    let tax: number;
    let liquidValue: number | null = null;

    const client = await this.prisma.client.findFirst({ where: { id: clientId } });
    if (!client) throw new NotFoundException('ClientId not found');

    if (typeTransaction === ETypeTransaction.credit && !installment)
      throw new BadRequestException('When type transaction was credit installment should be true');

    if (typeTransaction === ETypeTransaction.credit) {
      if (installment === 1) {
        tax = 2.99;
        liquidValue = (value * tax) / 100;
      } else if (installment! <= 2 || installment! >= 6) {
        tax = 3.49;
        liquidValue = (value * tax) / 100;
      } else if (installment! <= 7 || installment! >= 12) {
        tax = 3.99;
        liquidValue = (value * tax) / 100;
      }
    }

    if (value >= 10000) {
      riskRules = RiskRules.highRisk;
    } else if (this.checkIntervalDate()) {
      riskRules = RiskRules.lessRisk;
    }

    return await this.prisma.transaction.create({
      data: {
        value,
        clientId,
        typeTransaction,
        tax: 0,
        status: EStatusTransaction.approve,
        riskRules,
        liquidValue,
      },
    });
  }

  findAll() {
    return `This action returns all transaction`;
  }

  // async findOne(clientId: string): Promise<any> {
  //   let transactionByLevel: TransactionLevelDto;

  //   const client = await this.prisma.client.findFirst({ where: { id: clientId } });
  //   if (!client) throw new NotFoundException('ClientId not found');

  //   const transactions = await this.prisma.transaction.findMany({ where: { clientId } });

  //   const newArray = transactions.map((transaction) => {
  //     if (transaction.riskRules === RiskRules.highRisk) transactionByLevel.highLevel.push(transaction);
  //     else if (transaction.riskRules === RiskRules.lessRisk) transactionByLevel.lessLevel.push(transaction);
  //   });

  //   return newArray;
  // }

  private checkIntervalDate(): boolean {
    const dateNow = new Date();

    if (dateNow.getHours() >= 0 && dateNow.getHours() <= 5) return true;

    return false;
  }
}
