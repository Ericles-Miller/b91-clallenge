import { ApiProperty } from '@nestjs/swagger';

export class ClientEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fantasyName: string;

  @ApiProperty()
  cnpj: string;
}
