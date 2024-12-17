import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { RasaiaModule } from 'src/rasaia/rasaia.module';
import { CommonModule } from 'src/common/common.module';
import { ChatModule } from 'src/chat/chat.module';
import { MessageModule } from 'src/message/message.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [WhatsappController],
  providers: [WhatsappService],
  exports: [WhatsappService],
  imports: [RasaiaModule, CommonModule, ChatModule, MessageModule, UsersModule],
})
export class WhatsappModule {}
