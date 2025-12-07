import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../src/tasks/tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn()
  };
  const mockUsersService = { findById: jest.fn() };

  beforeEach(async () => {
    // manually construct
    service = new TasksService(mockRepo as any, mockUsersService as any);
  });

  it('create task saves and returns', async () => {
    mockUsersService.findById.mockResolvedValue({ id: 'u1' });
    mockRepo.create.mockReturnValue({ title: 't1' });
    mockRepo.save.mockResolvedValue({ id: 't1', title: 't1' });

    const res = await service.create('u1', { title: 't1' } as any);
    expect(res).toHaveProperty('id');
  });
});
