import { ApiProperty } from '@nestjs/swagger';
import { ETypeTransaction } from '../enum/type-transaction.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: 'clientId' })
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  @ApiProperty({ example: '5000' })
  @IsNumber()
  value: number;

  @ApiProperty({ example: 'debit', enum: ETypeTransaction })
  @IsEnum(ETypeTransaction)
  @IsNotEmpty()
  typeTransaction: ETypeTransaction;

  @ApiProperty({ example: 'number of installment ' })
  @IsNumber()
  @IsOptional()
  installment?: number;
}
