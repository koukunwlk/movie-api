import { InjectModel } from '@nestjs/mongoose';
import { MongoDBUser } from './entities/mongodb-user.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User, UserInterface } from '../../domain/models/user.model';

@Injectable()
export class MongoDBUserRepository implements UserRepository {
  constructor(
    @InjectModel('MongoDBUser')
    private readonly mongoDBUserModel: Model<MongoDBUser>,
  ) {}

  async create(user: User): Promise<void> {
    const createdMongoDBUser = new this.mongoDBUserModel(user.toEntity());
    createdMongoDBUser.save();
  }

  async findOne(options: Partial<UserInterface>): Promise<User | null> {
    const mongoDBUser = await this.mongoDBUserModel.findOne(options).exec();
    if (!mongoDBUser) {
      return null;
    }
    return User.createFromPersistence(mongoDBUser.toJSON());
  }

  async findById(id: string): Promise<User | null> {
    const mongoDBUser = await this.mongoDBUserModel.findById(id).exec();
    if (!mongoDBUser) {
      return null;
    }
    return User.createFromPersistence(mongoDBUser.toJSON());
  }
}
