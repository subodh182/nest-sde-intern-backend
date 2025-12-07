import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  // Injecting AuthService to handle authentication logic
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    // Call service to create a new user
    const user = await this.authService.register(dto);

    // Return selected fields (never return password)
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }

  @HttpCode(HttpStatus.OK) // Ensures response status is 200 instead of 201
  @Post('login')
  async login(@Body() dto: LoginDto) {
    // Validate user credentials (email + password)
    const user = await this.authService.validateUser(dto.email, dto.password);

    // Generate and return JWT token upon successful validation
    return this.authService.login(user);
  }
}
