import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { Telegram } from './telegram.entity';

@Controller('api/telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get(':id')
  async getTelegramDataById(@Param('id') id: number): Promise<any> {
    return this.telegramService.getMessageById(id);
  }

  @Get()
  async getAllTelegramData(): Promise<any> {
    return this.telegramService.getAllMessages();
  }

  @Post()
  async createTelegramData(
    @Body() createData: { message: string },
  ): Promise<Telegram> {
    return this.telegramService.saveToDatabase(createData.message);
  }

  @Delete(':id')
  async deleteTelegramDataById(@Param('id') id: number): Promise<void> {
    return this.telegramService.deleteMessageById(id);
  }
}
