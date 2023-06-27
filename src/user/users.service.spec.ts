import { User } from './domain/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import { UserService } from './users.service';
import { randomUUID } from 'crypto';

class UserRepositoryMock implements UserRepository {
  create = jest.fn();
  findOne = jest.fn();
  findById = jest.fn();
}
let users: User[] = [];

describe('UserService', () => {
  let userService: UserService;
  const userRepositoryMock = new UserRepositoryMock();

  beforeEach(async () => {
    users = [];
    for (let i = 0; i < 10; i++) {
      users.push(generateUserFromPersistence(i));
    }
    userService = new UserService(userRepositoryMock);

    userRepositoryMock.findById.mockImplementation((id: string) => {
      return users.find((user) => user.getId() === id);
    });

    userRepositoryMock.findOne.mockImplementation(({ username }) => {
      return users.find((user) => user.getUsername() === username);
    });
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should call userRepository.create', async () => {
      // Arrange
      const userInfo = generateUserInfo();

      // Act
      await userService.create(userInfo);

      // Assert
      expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the user already exists', async () => {
      // Arrange
      const userInfo = generateUserInfo();
      userRepositoryMock.findOne.mockImplementationOnce(() => {
        return userInfo;
      });

      // Act
      const promise = userService.create(userInfo);

      // Assert
      expect(promise).rejects.toThrow('User already exists');
    });

    it('should throw an error if the user could not be created', async () => {
      // Arrange
      const userInfo = generateUserInfo();
      userRepositoryMock.create.mockImplementationOnce(() => {
        throw new Error();
      });

      // Act
      const promise = userService.create(userInfo);

      // Assert
      expect(promise).rejects.toThrow("Couldn't create user");
    });
  });

  describe('findByUsername', () => {
    it('should call userRepository.findOne', async () => {
      // Arrange
      const username = users[0].getUsername();

      // Act
      await userService.findByUsername(username);

      // Assert
      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ username });
    });
    it('should return a user', async () => {
      // Arrange
      const username = users[0].getUsername();

      // Act
      const user = await userService.findByUsername(username);

      // Assert
      expect(user).toBeDefined();
      expect(user).toEqual(users[0]);
    });
  });

  describe('findById', () => {
    it('should call userRepository.findById', async () => {
      // Arrange
      const id = users[0].getId();

      // Act
      await userService.findById(id);

      // Assert
      expect(userRepositoryMock.findById).toHaveBeenCalledWith(id);
    });

    it('should return a user', async () => {
      // Arrange
      const id = users[0].getId();

      // Act
      const user = await userService.findById(id);

      // Assert
      expect(user).toBeDefined();
      expect(user).toEqual(users[0]);
    });
  });
});

function generateUserInfo(): CreateUserDto {
  return {
    name: 'John Doe',
    username: 'johnDoe',
    password: 'password',
  };
}

function generateUserFromPersistence(index: number): User {
  return User.createFromPersistence({
    id: randomUUID(),
    name: 'John Doe',
    username: `johnDoe${index}`,
    passwordHash: 'password',
  });
}
