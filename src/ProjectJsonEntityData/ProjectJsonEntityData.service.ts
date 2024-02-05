import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectJsonEntityData } from './ProjectJsonEntityData.entity';
import * as fs from 'fs';

@Injectable()
export class ProjectJsonEntityDataService {
  constructor(
    @InjectRepository(ProjectJsonEntityData)
    private readonly projectJsonEntityDataRepository: Repository<ProjectJsonEntityData>,
  ) {}

  async saveDataFromJsonFile(): Promise<ProjectJsonEntityData[]> {
    const filePath = 'src/telegramBot/commands.json';
    const jsonDataFromFile = this.readJsonFile(filePath);
    const entities: ProjectJsonEntityData[] = [];

    for (const item of jsonDataFromFile) {
      const entity = new ProjectJsonEntityData();
      entity.jsonData = item.data || null;
      entity.key = item.key !== 'null' ? item.key : null;
      entities.push(await this.projectJsonEntityDataRepository.save(entity));
    }

    return entities;
  }

  private readJsonFile(filePath: string): any {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error: any) {
      throw new Error(`Error reading JSON file: ${error.message}`);
    }
  }
}
