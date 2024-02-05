import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramController } from './telegram.controller';
import { Telegram } from './telegram.entity';
import { TelegramService } from './telegram.service';

@Module({
  imports: [TypeOrmModule.forFeature([Telegram])],
  controllers: [TelegramController],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
