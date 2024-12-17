import { Test, TestingModule } from '@nestjs/testing';
import { RasaiaService } from './rasaia.service';

describe('RasaiaService', () => {
  let service: RasaiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RasaiaService],
    }).compile();

    service = module.get<RasaiaService>(RasaiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
