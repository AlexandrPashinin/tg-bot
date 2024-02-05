import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectJsonEntityData } from './ProjectJsonEntityData.entity';
import { ProjectJsonEntityDataController } from './ProjectJsonEntityData.controller';
import { ProjectJsonEntityDataService } from './ProjectJsonEntityData.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectJsonEntityData])],
  controllers: [ProjectJsonEntityDataController],
  providers: [ProjectJsonEntityDataService],
})
export class ProjectJsonEntityDataModule {}
