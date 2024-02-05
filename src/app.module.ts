// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TelegramController } from './telegram/telegram.controller';
//
// @Module({
//   imports: [],
//   controllers: [AppController, TelegramController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { UserController } from './user/user.controller';

import { TelegramEventController } from './telegram-event/telegram-event.controller';
import { TelegramBotModule } from './telegramBot/telegram.module';
import { UserModule } from './user/user.module';
import { TelegramEventModule } from './telegram-event/telegram-event.module';
import { ProjectController } from './project/project.controller';
import { ProjectModule } from './project/project. module';
import { ProjectJsonEntityData } from './ProjectJsonEntityData/ProjectJsonEntityData.entity';
import { ProjectJsonEntityDataService } from './ProjectJsonEntityData/ProjectJsonEntityData.service';
import { ProjectJsonEntityDataModule } from './ProjectJsonEntityData/ProjectJsonEntityData.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ProjectJsonEntityData]),
    TelegramModule,
    TelegramBotModule,
    UserModule,
    TelegramEventModule,
    ProjectModule,
    ProjectJsonEntityDataModule,
  ],
  controllers: [
    AppController,
    UserController,
    ProjectController,
    TelegramEventController,
  ],
  providers: [AppService, ProjectJsonEntityDataService],
})
export class AppModule {}
