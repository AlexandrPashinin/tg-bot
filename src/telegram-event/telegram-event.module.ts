import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramEventController } from './telegram-event.controller';
import { TelegramEvent } from './telegram-event.entity';
import { TelegramEventService } from './telegram-event.service';

@Module({
  imports: [TypeOrmModule.forFeature([TelegramEvent])],
  controllers: [TelegramEventController],
  providers: [TelegramEventService],
  exports: [TelegramEventService],
})
export class TelegramEventModule {}
