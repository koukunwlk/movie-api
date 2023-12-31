import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './domain/models/user.model';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    if (await this.findByUsername(createUserDto.username)) {
      throw new BadRequestException('Usuário já cadastrado');
    }

    const createdUser = User.create(createUserDto);
    try {
      this.userRepository.create(createdUser);
    } catch (error) {
      throw new BadRequestException('Não foi possível criar o usuário');
    }
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }
  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }
}
