import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/domain/models/user.model';
import { UserService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.validatePassword(password)) {
      return user;
    }
    return null;
  }

  async login(
    user: User,
  ): Promise<{ accessToken: string; username: string; name: string }> {
    const payload = { username: user.getUsername(), sub: user.getId() };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, username: user.getUsername(), name: user.getName() };
  }

  async validateUserById(userId: string): Promise<User | null> {
    return await this.userService.findById(userId);
  }
}
