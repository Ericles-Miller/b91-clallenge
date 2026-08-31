import { Transaction } from '@prisma/client';

export class TransactionLevelDto {
  midLevel: Transaction[];
  highLevel: Transaction[];
  lessLevel: Transaction[];
}
