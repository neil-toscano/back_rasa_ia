import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    try {
      const dato = await axios.get('http://localhost:5005');
      console.log('dato', dato);
    } catch (error) {
      console.log('error-app');
    }
    return 'Hola, soy el chatbot de la MUNISJL';
  }
}
