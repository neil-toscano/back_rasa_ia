import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const { password, username, phoneNumber } = data;

    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });

    if (user)
      throw new NotFoundException('Ya existe usuario con dicho teléfono');
    const hash = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        username: username,
        password: hash,
        phoneNumber: phoneNumber,
      },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByTerm(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con no encontrado`);
    }

    return user;
  }

  async findByPhone(phoneNumber: string): Promise<User | undefined> {
    console.log(phoneNumber, 'phoneNumber');
    const user = await this.prisma.user.findUnique({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    return user;
  }
}
