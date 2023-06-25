import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export interface UserInterface {
  id?: string;
  name: string;
  username: string;
  passwordHash: string;
}

export class User {
  private readonly name: string;
  private readonly username: string;
  private readonly passwordHash: string;
  private readonly id?: string;

  private constructor(props: UserInterface) {
    this.name = props.name;
    this.username = props.username;
    this.passwordHash = props.passwordHash;
    this.id = props.id;
  }

  static create(props: CreateUserDto): User {
    const rounds = 10;
    const passwordHash = bcrypt.hashSync(props.password, rounds);
    return new User({ ...props, passwordHash });
  }

  static createFromPersistence(props: UserInterface): User {
    return new User(props);
  }

  getName(): string {
    return this.name;
  }

  getUsername(): string {
    return this.username;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  getId(): string {
    return this.id;
  }

  toJson(): UserInterface {
    return {
      name: this.name,
      username: this.username,
      passwordHash: this.passwordHash,
      id: this.id,
    };
  }

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }

  toEntity() {
    return {
      name: this.name,
      username: this.username,
      passwordHash: this.passwordHash,
    };
  }
}
