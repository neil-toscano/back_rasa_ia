import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('test')
  test() {
    console.log('test');
  }

  @Post('webhooks')
  async webhooks(@Body() info: any) {
    console.log(JSON.stringify(info), 'info');
    const messageBody =
      info?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;

    const entry = info?.entry?.[0];
    const change = entry?.changes?.[0];
    const messageData = change?.value;
    const messageType = messageData?.messages?.[0].type || null;

    const contact = messageData?.contacts?.[0];
    console.log({ messageType });
    switch (messageType) {
      case 'interactive':
        const interactiveType = messageData?.messages?.[0]?.[messageType]?.type;
        const listReplyId =
          messageData?.messages?.[0]?.[messageType]?.[interactiveType];
        await this.whatsappService.webhooks({
          sender: 'neil',
          message: `${listReplyId.id}`,
          phoneNumber: contact?.wa_id,
        });
        break;
      case 'text':
        await this.whatsappService.webhooks({
          sender: 'neil',
          message: messageBody,
          phoneNumber: contact?.wa_id,
        });
        break;
      default:
        break;
    }

    return { status: 'ok' };
  }

  @Get('webhooks')
  webHooks(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Query('hub.verify_token') verifyToken: string,
  ) {
    const expectedToken = '12345678'; // Cambia esto a tu token de verificación
    console.log(verifyToken, 'token');
    if (mode === 'subscribe' && verifyToken === expectedToken) {
      return challenge; // Devuelve el desafío como respuesta
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
