import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios-adapter';
import { RasaMessage } from './interfaces/rasa-message.interface';

@Injectable()
export class RasaiaService {
  constructor(private readonly http: AxiosAdapter) {}

  async sendRasaIa(rasaMessage: RasaMessage) {
    const { sender, message } = rasaMessage;

    const url = process.env.RASA_IA_URL;
    try {
      const result = await this.http.post<any>(url, {
        sender,
        message,
      });

      return result;
    } catch (error) {
      console.log(error, 'rasa-error');
      return [];
    }
  }
}
