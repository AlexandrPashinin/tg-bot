// telegram-event.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelegramEvent } from './telegram-event.entity';

@Injectable()
export class TelegramEventService {
  constructor(
    @InjectRepository(TelegramEvent)
    private readonly telegramEventRepository: Repository<TelegramEvent>,
  ) {}

  async findAll(): Promise<TelegramEvent[]> {
    return this.telegramEventRepository.find();
  }

  async findOne(id: any): Promise<TelegramEvent> {
    const telegramEvent = await this.telegramEventRepository.findOne(id);

    if (!telegramEvent) {
      throw new NotFoundException(`TelegramEvent with id ${id} not found`);
    }

    return telegramEvent;
  }

  async create(telegramEvent: TelegramEvent): Promise<TelegramEvent> {
    return this.telegramEventRepository.save(telegramEvent);
  }

  async update(id: any, telegramEvent: TelegramEvent): Promise<TelegramEvent> {
    const existingTelegramEvent = await this.findOne(id);

    // Обновляем только существующие свойства TelegramEvent
    Object.assign(existingTelegramEvent, telegramEvent);

    return this.telegramEventRepository.save(existingTelegramEvent);
  }

  async remove(id: number): Promise<void> {
    const telegramEvent = await this.findOne(id);
    await this.telegramEventRepository.remove(telegramEvent);
  }
}
