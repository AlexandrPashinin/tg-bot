// telegram-bot/telegramBot.module.ts
import { Module, Global } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TelegramBotService, UserService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
