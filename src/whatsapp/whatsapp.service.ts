import { Injectable } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { AxiosAdapter } from 'src/common/adapters/axios-adapter';
import { MessageService } from 'src/message/message.service';
import { WebhookMessage } from 'src/rasaia/interfaces/rasa-message.interface';
import { RasaiaService } from 'src/rasaia/rasaia.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WhatsappService {
  constructor(
    private readonly http: AxiosAdapter,
    private rasaiaService: RasaiaService,
    private chatService: ChatService,
    private messageService: MessageService,
    private userService: UsersService,
  ) {}

  async webhooks(payload: WebhookMessage) {
    const { sender, message, phoneNumber } = payload;
    try {
      console.log(sender, message, phoneNumber);
      const data: any[] = await this.rasaiaService.sendRasaIa({
        sender,
        message,
      });
      console.log(data, 'data');
      const botPhone = process.env.BOT_PHONE;
      let user: any = await this.userService.findByPhone(phoneNumber);
      let bot: any = await this.userService.findByPhone(botPhone);

      console.log(user, bot);
      if (!user) {
        user = await this.userService.createUser({
          username: 'usuario',
          phoneNumber: phoneNumber,
          password: '123456789',
        });
      }

      if (!bot) {
        bot = await this.userService.createUser({
          username: 'bot',
          phoneNumber: botPhone,
          password: '123456789',
        });
      }

      // !Enviando a DB
      await this.messageService.sendMessage(user.id, bot.id, message);

      if (data.length === 0)
        return {
          status: 'ok',
        };

      const blocks: any[] = data[0].custom.blocks;

      this.chatService.sendMessage(blocks);

      for (const message of blocks) {
        await this.sendMessage({
          phoneNumber,
          payload: message,
        });
        await new Promise((resolve: any) => setTimeout(resolve, 1000));
      }
      // ! envia mensaje al DB
      await this.messageService.sendMessage(
        bot.id,
        user.id,
        JSON.stringify(blocks),
      );
      return { status: 'ok' };
    } catch (error) {
      console.log(error);
      return { status: 'ok' };
    }
    
  }

  async sendMessage(sendData: { phoneNumber: string; payload: object }) {
    console.log(sendData, 'sendData');
    const { phoneNumber, payload } = sendData;
    const url = `${process.env.wHATSAPP_BASE_URL}/${process.env.WHATSAPP_PHONE_NUMBER}/messages`;

    const data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: `+${phoneNumber}`,
      ...payload,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER_TOKEN_WHATSAPP}`,
    };
    const result = await this.http.post(url, data, headers);
    return result;
  }
}
