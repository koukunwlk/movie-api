import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
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
  controllers: [UsersController],
  providers: [UsersService, UserRepositoryProvider],
})
export class UsersModule {}
