import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@UsePipes(new ValidationPipe({ transform: false }))
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
}
