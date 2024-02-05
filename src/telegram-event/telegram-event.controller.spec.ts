import { Test, TestingModule } from '@nestjs/testing';
import { TelegramEventController } from './telegram-event.controller';

describe('TelegramEventController', () => {
  let controller: TelegramEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramEventController],
    }).compile();

    controller = module.get<TelegramEventController>(TelegramEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
