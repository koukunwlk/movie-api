import { User, UserInterface } from '../domain/models/user.model';

export abstract class UserRepository {
  abstract create: (user: User) => Promise<void>;
  abstract findOne: (options: Partial<UserInterface>) => Promise<User | null>;
  abstract findById: (id: string) => Promise<User | null>;
}
