// project/project.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(project_id: any): Promise<Project> {
    const project = await this.projectRepository.findOne(project_id);
    if (!project) {
      throw new NotFoundException(`Проект с ID ${project_id} не найден`);
    }
    return project;
  }

  async create(project: Project): Promise<Project> {
    try {
      console.log('Creating project:', project);
      return this.projectRepository.save(project);
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  async update(
    project_id: any,
    updatedProject: Partial<Project>,
  ): Promise<Project> {
    await this.projectRepository.update(project_id, updatedProject);
    return this.projectRepository.findOne(project_id) as any;
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
