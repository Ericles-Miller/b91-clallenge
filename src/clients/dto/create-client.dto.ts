import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validateCNPJ } from 'src/utils/cnpj.validator';

export class CreateClientDto {
  @ApiProperty({ example: 'B91', description: 'Name of the client to be created' })
  @IsString()
  @IsNotEmpty()
  fantasyName: string;

  @IsNotEmpty()
  @validateCNPJ()
  @ApiProperty({ example: 'cnpj client' })
  cnpj: string;
}
