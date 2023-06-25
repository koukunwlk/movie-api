import * as bcrypt from 'bcrypt';
import { User } from './user.model';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

const userInfo = generateUserInfo();
describe('UserModel', () => {
  it('should be defined', () => {
    //Act
    const user = User.create(userInfo);

    //Assert
    expect(user).toBeDefined();
  });

  it('should generate a valid password hash', () => {
    //Act
    const user = User.create(userInfo);

    //Assert
    expect(
      decryptPassword(user.getPasswordHash(), userInfo.password),
    ).resolves.toBeTruthy();
  });
});

async function decryptPassword(
  passwordHash: string,
  password: string,
): Promise<boolean> {
  const isMatch = bcrypt.compareSync(password, passwordHash);
  return isMatch;
}

function generateUserInfo(): CreateUserDto {
  return {
    name: 'John Doe',
    username: 'johnDoe',
    password: 'password',
  };
}
