import { Controller, Post } from '@nestjs/common';
import { ProjectJsonEntityDataService } from './ProjectJsonEntityData.service';

@Controller('project-json-entity-data')
export class ProjectJsonEntityDataController {
  constructor(
    private readonly projectJsonEntityDataService: ProjectJsonEntityDataService,
  ) {}

  @Post('save-json')
  async saveJsonData() {
    const savedData =
      await this.projectJsonEntityDataService.saveDataFromJsonFile();
    return { message: 'Data saved successfully', savedData };
  }
}
