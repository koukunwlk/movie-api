import { ClassProvider } from '@nestjs/common';
import { MongoDBUserRepository } from './mongodb/mongodb-user.repository';
import { UserRepository } from './user.repository';

export const UserRepositoryProvider: ClassProvider = {
  provide: UserRepository,
  useClass: MongoDBUserRepository,
};
