import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    const clientIp = client.handshake.address;
    console.log('Nueva Conexión cliente IP =>', clientIp);
    this.chatService.sendMessage(clientIp);
  }

  handleDisconnect(client: Socket) {
    const clientIp = client.handshake.address;
    console.log('Cliente desconectado cliente IP =>', clientIp);
  }

  @SubscribeMessage('createChat')
  create(
    @MessageBody() createChatDto: CreateChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    // this.chatService.sendMessage(cre);
    // return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll(@MessageBody() data: { botId: string }) {
    return this.chatService.findAll(data.botId);
  }

  @SubscribeMessage('findOneChat')
  findOne(
    @MessageBody() data: { chatId: string; page: number; limit: number },
  ) {
    return this.chatService.findOne(data);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
