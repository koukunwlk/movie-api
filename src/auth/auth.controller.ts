import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() credentials: { username: string; password: string },
  ): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(
      credentials.username,
      credentials.password,
    );
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    return this.authService.login(user);
  }

  // Example protected route
  @Get('protected')
  @UseGuards(AuthGuard())
  async protectedRoute(): Promise<string> {
    return 'This route is protected';
  }
}
