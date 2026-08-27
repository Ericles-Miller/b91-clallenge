import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name }: CreateUserDto): Promise<UserEntity> {
    const userAlreadyEmail = await this.findByEmail(email);
    if (userAlreadyEmail) throw new BadRequestException('user already exists with email');

    const user = this.prisma.user.create({ data: { email, name } });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('userId does not exists!');
    return user;
  }

  async update(id: string, { name }: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id);

    return await this.prisma.user.update({ where: { id }, data: { name } });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
  }
}
