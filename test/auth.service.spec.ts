import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn()
  };
  const mockJwtService = { sign: jest.fn(() => 'signed-token') };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('validates user with correct password', async () => {
    const password = await bcrypt.hash('password123', 10);
    mockUsersService.findByEmail.mockResolvedValue({ id: '1', email: 'a@b.com', password });
    const user = await service.validateUser('a@b.com', 'password123');
    expect(user.email).toBe('a@b.com');
  });

  it('login returns token', async () => {
    const user = { id: '1', email: 'a@b.com', role: 'user' };
    const r = await service.login(user as any);
    expect(r.accessToken).toBe('signed-token');
  });
});
