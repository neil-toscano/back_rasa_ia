import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios-adapter';
import { RasaMessage } from './interfaces/rasa-message.interface';

@Injectable()
export class RasaiaService {
  constructor(private readonly http: AxiosAdapter) {}

  async sendRasaIa(rasaMessage: RasaMessage) {
    const { sender, message } = rasaMessage;

    const url = 'http://localhost:5005/webhooks/rest/webhook';
    try {
      const result = await this.http.post<any>(url, {
        sender,
        message,
      });
      console.log(result, 'result');
      return result;
    } catch (error) {
      console.log(error, 'rasa-error');
      return [];
    }
  }
}
