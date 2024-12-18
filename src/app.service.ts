import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    try {
      const dato = await axios.post(
        'http://localhost:5005/webhooks/rest/webhook',
        {
          sender: 'neil',
          message: 'hola',
        },
      );
      console.log('dato', dato.data);
    } catch (error) {
      console.log('error-app');
    }
    return 'Hola, soy el chatbot de la MUNISJL';
  }
}
