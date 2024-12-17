import { Controller } from '@nestjs/common';
import { RasaiaService } from './rasaia.service';

@Controller('rasaia')
export class RasaiaController {
  constructor(private readonly rasaiaService: RasaiaService) {}
}
