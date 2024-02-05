// telegram-event.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TelegramEventService } from './telegram-event.service';
import { TelegramEvent } from './telegram-event.entity';

@Controller('telegram-events')
export class TelegramEventController {
  constructor(private readonly telegramEventService: TelegramEventService) {}

  @Get()
  findAll(): Promise<TelegramEvent[]> {
    return this.telegramEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TelegramEvent> {
    return this.telegramEventService.findOne(+id);
  }

  @Post()
  create(@Body() telegramEvent: TelegramEvent): Promise<TelegramEvent> {
    return this.telegramEventService.create(telegramEvent);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() telegramEvent: TelegramEvent,
  ): Promise<TelegramEvent> {
    return this.telegramEventService.update(+id, telegramEvent);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.telegramEventService.remove(+id);
  }
}
