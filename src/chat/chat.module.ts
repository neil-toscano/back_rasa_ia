import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ChatGateway, ChatService, PrismaService],
  exports: [ChatService],
  imports: [],
})
export class ChatModule {}
