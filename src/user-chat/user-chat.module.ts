import { Module } from '@nestjs/common';
import { UserChatService } from './user-chat.service';
import { UserChatController } from './user-chat.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserChatController],
  providers: [UserChatService, PrismaService],
  exports: [UserChatService],
})
export class UserChatModule {}
