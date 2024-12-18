import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola, soy el chatbot de la MUNISJL';
  }
}
