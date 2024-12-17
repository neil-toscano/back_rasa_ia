import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RasaiaModule } from './rasaia/rasaia.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { UserChatModule } from './user-chat/user-chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RasaiaModule,
    CommonModule,
    WhatsappModule,
    AuthModule,
    UsersModule,
    ChatModule,
    MessageModule,
    UserChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
