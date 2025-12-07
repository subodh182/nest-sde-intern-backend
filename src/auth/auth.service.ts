import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }

  async register(dto: { name: string; email: string; password: string }) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new UnauthorizedException('Email already in use');
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(dto.password, salt);
    return this.usersService.create({ name: dto.name, email: dto.email, password: hashed });
  }
}
