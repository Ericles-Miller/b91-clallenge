import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty({
    description: 'Identificador único (UUID v7)',
    example: '018f1b2c-3d4e-7f80-9abc-def012345678',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Ana Silva',
  })
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'ana@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2026-08-27T13:24:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2026-08-27T13:24:00.000Z',
  })
  updatedAt: Date;
}
