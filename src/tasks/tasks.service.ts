import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepo: Repository<Task>,
    private usersService: UsersService
  ) {}

  async create(userId: string, dto: CreateTaskDto): Promise<Task> {
    const user = await this.usersService.findById(userId);
    const task = this.tasksRepo.create({ ...dto, user });
    return this.tasksRepo.save(task);
  }

  async findAllForUser(user: Partial<User>): Promise<Task[]> {
    if (user.role === UserRole.ADMIN) {
      return this.tasksRepo.find({ relations: ['user'] });
    }
    return this.tasksRepo.find({ where: { user: { id: user.id } }, relations: ['user'] });
  }

  async findById(id: string, user: Partial<User>): Promise<Task> {
    const task = await this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
    if (!task) throw new NotFoundException('Task not found');
    if (user.role !== UserRole.ADMIN && task.user.id !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return task;
  }

  async update(id: string, dto: UpdateTaskDto, user: Partial<User>): Promise<Task> {
    const task = await this.findById(id, user);
    Object.assign(task, dto);
    return this.tasksRepo.save(task);
  }

  async remove(id: string, user: Partial<User>): Promise<{ deleted: boolean }> {
    const task = await this.findById(id, user);
    await this.tasksRepo.delete(task.id);
    return { deleted: true };
  }
}
