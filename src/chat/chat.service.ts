import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server } from 'socket.io';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { PrismaService } from 'src/prisma.service';

@WebSocketGateway()
@Injectable()
export class ChatService {
  @WebSocketServer()
  private server: Server;

  constructor(private prisma: PrismaService) {}

  async create() {
    return await this.prisma.chat.create({
      data: {
        name: 'P',
      },
    });
  }

  async findAll(botId: string) {
    const chats = await this.prisma.chat.findMany({
      include: {
        userChats: {
          include: {
            user: true,
          },
          where: {
            user: {
              id: {
                not: botId,
              },
            },
          },
        },
      },
    });
    console.log(JSON.stringify(chats));
    return chats;
  }

  async findOne(data: { chatId: string; page: number; limit: number }) {
    const { chatId, page, limit } = data;
    const pageNumber = page || 1;
    const pageSize = limit || 2;
    const offset = (pageNumber - 1) * pageSize;

    const chat = await this.prisma.chat.findFirst({
      where: {
        id: chatId,
      },
      include: {
        messages: {
          skip: offset,
          take: pageSize,
          orderBy: { sentAt: 'desc' },
        },
      },
    });

    if (!chat) {
      throw new Error('Chat not found');
    }
    console.log(data);
    // console.log(JSON.stringify(chat), 'chat');

    return chat;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }

  sendMessage(info: any) {
    this.server.emit('chat-message', info);
  }
}
