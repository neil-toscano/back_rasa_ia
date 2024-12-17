import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaService } from 'src/prisma.service';
import { UserChatModule } from 'src/user-chat/user-chat.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService, PrismaService],
  imports: [UserChatModule, ChatModule],
  exports: [MessageService],
})
export class MessageModule {}
