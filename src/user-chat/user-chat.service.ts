import { Injectable } from '@nestjs/common';
import { UpdateUserChatDto } from './dto/update-user-chat.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserChatService {
  constructor(private prisma: PrismaService) {}

  async create(createUserChatDto: Prisma.UserChatCreateInput) {
    // const userChat = await this.findChat()
    return await this.prisma.userChat.create({
      data: createUserChatDto,
    });
  }

  findAll() {
    return `This action returns all userChat`;
  }

  async findChat(user1: string, user2: string) {
    const sharedChat = await this.prisma.userChat.findMany({
      where: {
        chatID: {
          in: (
            await this.prisma.userChat.findMany({
              where: {
                userID: user1,
              },
              select: { chatID: true },
            })
          ).map((uc) => uc.chatID),
        },
        userID: user2,
      },
      select: { chat: true },
    });

    return sharedChat.length > 0 ? sharedChat : null;
  }

  update(id: number, updateUserChatDto: UpdateUserChatDto) {
    return `This action updates a #${id} userChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} userChat`;
  }
}
