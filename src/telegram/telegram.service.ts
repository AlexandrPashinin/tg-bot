// telegram/telegram.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Telegram } from './telegram.entity';

@Injectable()
export class TelegramService {
  constructor(
    @InjectRepository(Telegram)
    private readonly telegramRepository: Repository<Telegram>,
  ) {}

  async getAllMessages(): Promise<Telegram[]> {
    return await this.telegramRepository.find();
  }

  async getMessageById(id: number): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const message = await this.telegramRepository.findOneBy({ id: id });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  async saveToDatabase(message: string): Promise<Telegram> {
    const telegramData = new Telegram();
    telegramData.message = message;
    telegramData.timestamp = new Date();
    return await this.telegramRepository.save(telegramData);
  }

  async deleteMessageById(id: number): Promise<void> {
    const result = await this.telegramRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
  }
}
