// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(user_id: any): Promise<User> {
    const user = await this.userRepository.findOne(user_id);
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${user_id} не найден`);
    }
    return user;
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(user_id: any, updatedUser: Partial<User>): Promise<User> {
    await this.userRepository.update(user_id, updatedUser);
    return this.userRepository.findOne(user_id) as any;
  }
  async saveUserText(text: string): Promise<User> {
    const newUser = this.userRepository.create({ user_text: text });
    return await this.userRepository.save(newUser);
  }

  async getUserTextById(user_id: any): Promise<string | null | number> {
    const user = await this.userRepository.findOne(user_id);

    return user ? user.user_text : null;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
