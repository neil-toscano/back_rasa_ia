import { Test, TestingModule } from '@nestjs/testing';
import { RasaiaController } from './rasaia.controller';
import { RasaiaService } from './rasaia.service';

describe('RasaiaController', () => {
  let controller: RasaiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RasaiaController],
      providers: [RasaiaService],
    }).compile();

    controller = module.get<RasaiaController>(RasaiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
