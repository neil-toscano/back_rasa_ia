import { Injectable } from '@nestjs/common';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ChatService } from 'src/chat/chat.service';
import { UserChatService } from 'src/user-chat/user-chat.service';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private readonly chatService: ChatService,
    private readonly userChatService: UserChatService,
  ) {}

  async create(createMessageDto: Prisma.MessageCreateInput) {
    const message = await this.prisma.message.create({
      data: createMessageDto,
    });
    return message;
  }

  async sendMessage(senderId: string, receiverId: string, text: string) {
    const userChat: any[] = await this.userChatService.findChat(
      senderId,
      receiverId,
    );

    if (!userChat) {
      const newChat = await this.chatService.create();
      await this.userChatService.create({
        user: {
          connect: {
            id: senderId,
          },
        },
        chat: {
          connect: {
            id: newChat.id,
          },
        },
      });
      await this.userChatService.create({
        user: {
          connect: {
            id: receiverId,
          },
        },
        chat: {
          connect: {
            id: newChat.id,
          },
        },
      });

      await this.create({
        user: { connect: { id: senderId } },
        chat: {
          connect: {
            id: newChat.id,
          },
        },
        content: text,
        type: 'TEXT',
      });
    } else {
      await this.create({
        user: { connect: { id: senderId } },
        chat: {
          connect: {
            id: userChat[0].chat.id,
          },
        },
        content: text,
        type: 'TEXT',
      });
    }
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
