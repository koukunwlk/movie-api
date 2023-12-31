import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import {
  MongoDBUser,
  MongoDBUserSchema,
} from './repository/mongodb/entities/mongodb-user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepositoryProvider } from './repository/user.repository.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MongoDBUser.name,
        schema: MongoDBUserSchema,
        collection: 'users',
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepositoryProvider],
  exports: [UserService],
})
export class UserModule {}
