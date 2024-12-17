import { Module } from '@nestjs/common';
import { RasaiaService } from './rasaia.service';
import { RasaiaController } from './rasaia.controller';
import { CommonModule } from 'src/common/common.module';
@Module({
  imports: [CommonModule],
  controllers: [RasaiaController],
  providers: [RasaiaService],
  exports: [RasaiaService],
})
export class RasaiaModule {}
