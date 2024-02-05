import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Telegraf, Markup, Context } from 'telegraf';
import * as fs from 'fs';
import * as path from 'path';
import { UserService } from '../user/user.service';

const TELEGRAM_TOKEN: string = '6840175645:AAH6gm95dEZVARVKNq9WsZzbVsTQSviTATo';

@Injectable()
export class TelegramBotService implements OnModuleInit, OnModuleDestroy {
  private readonly bot: Telegraf;
  private stages: any[] = [];
  private currentStageIndex: number = 0;

  constructor(private readonly userService: UserService) {
    this.bot = new Telegraf(TELEGRAM_TOKEN);
  }

  onModuleInit() {
    this.setupStages();
    this.start();
  }

  onModuleDestroy() {
    this.stop();
  }

  private start() {
    this.bot.start(async (ctx) => {
      await this.handleStartCommand(ctx);
    });

    this.bot.on('callback_query', async (ctx: any) => {
      // Получаем данные пользователя из контекста Telegram
      const userId = ctx.from?.id;
      const firstName = ctx.from?.first_name;
      const lastName = ctx.from?.last_name;
      const userName = ctx.from?.username;

      // Создаем объект пользователя для сохранения в базе данных
      const user = {
        user_id: userId,
        firstName: firstName || '',
        lastName: lastName || '',
        user_log: userName || '',
        user_text: '...',
      };

      // Сохраняем пользователя в базе данных
      await this.userService.create(user);
      console.log(`пользователь добавлен с таким айди: ${user.user_id}`);

      // Увеличиваем индекс этапа для переключения на следующий этап
      this.currentStageIndex++;

      // Проверяем, не вышли ли за пределы массива этапов
      if (this.currentStageIndex < this.stages.length) {
        const currentStage = this.stages[this.currentStageIndex];
        await this.handleStage(currentStage, ctx);
      } else {
        console.log('Все этапы завершены');
      }
    });

    this.bot.launch();
  }

  private stop() {
    this.bot.stop();
  }

  private setupStages() {
    const commandsPath = path.join(__dirname, 'commands.json');
    const commands = JSON.parse(fs.readFileSync(commandsPath, 'utf-8'));
    if (Array.isArray(commands)) {
      this.stages = commands;
    } else {
      console.error('Invalid format in commands.json');
    }
  }

  private async handleStartCommand(ctx: Context) {
    const userName = ctx.from?.first_name || 'Пользователь';
    const welcomeMessage = `Добро пожаловать, ${userName}!`;
    const initialStage = this.stages[0];

    if (initialStage) {
      await ctx.reply(welcomeMessage);
      const personalizedText =
        initialStage.data.text?.replace('{userName}', userName) || '';
      await ctx.reply(
        personalizedText,
        this.getKeyboard(initialStage.data.buttons),
      );
    }
  }

  private async handleStage(stage: any, ctx: Context) {
    const userName = ctx.from?.first_name || 'Пользователь';
    const text = stage.data.text?.replace('{userName}', userName) || '';
    await ctx.reply(text, this.getKeyboard(stage.data.buttons));
  }

  private getKeyboard(buttons: any[]) {
    const keyboardButtons = buttons.map((button) => ({
      text: button.name,
      callback_data: button.id,
    }));

    return Markup.inlineKeyboard(keyboardButtons);
  }
}
