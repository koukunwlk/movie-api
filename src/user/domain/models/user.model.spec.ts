import { User } from './user.model';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

const userInfo = generateUserInfo();
describe('UserModel', () => {
  it('should create a user', () => {
    //Act
    const user = User.create(userInfo);

    //Assert
    expect(user).toBeDefined();
  });

  it('should create a user from persistence', () => {
    //Act
    const user = User.createFromPersistence({
      ...userInfo,
      passwordHash: 'password',
    });

    //Assert
    expect(user).toBeDefined();
  });

  it('should generate a valid password hash', () => {
    //Act
    const user = User.create(userInfo);

    //Assert
    expect(user.getPasswordHash()).toBeDefined();
  });

  it('should validate a password hash', () => {
    //Act
    const user = User.create(userInfo);

    //Assert
    expect(user.validatePassword(userInfo.password)).toEqual(true);
  });

  it('should return the entity', () => {
    // Arrange

    //Act
    const user = User.create(userInfo);
    const entity = user.toEntity();

    //Assert
    expect(entity).toBeDefined();
  });

  it('should return the json', () => {
    // Arrange

    //Act
    const user = User.create(userInfo);
    const json = user.toJson();

    //Assert
    expect(json).toBeDefined();
  });
});

function generateUserInfo(): CreateUserDto {
  return {
    name: 'John Doe',
    username: 'johnDoe',
    password: 'password',
  };
}
