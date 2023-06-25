import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './domain/models/user.model';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    if (await this.verifyIfUserExists(createUserDto.username)) {
      throw new Error('User already exists');
    }

    const createdUser = User.create(createUserDto);
    try {
      this.userRepository.create(createdUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyIfUserExists(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }
}
