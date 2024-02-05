import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectService.findOne(+id);
  }

  @Post()
  create(@Body() project: Project): Promise<Project> {
    try {
      return this.projectService.create(project);
    } catch (error: any) {
      console.error('Error in create method:', error.message);
      throw new InternalServerErrorException('Не удалось создать проект.');
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() project: Project): Promise<Project> {
    return this.projectService.update(+id, project);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectService.remove(+id);
  }
}
