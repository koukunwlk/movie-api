import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Document } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  MongoDBMovie,
  MongoDBMovieSchema,
} from './entities/mongodb-movie.entity';
import { MovieRepository } from '../movie.repository';
import { Movie, MovieInterface } from '../../domain/models/movie.model';

@Injectable()
export class MongoDBMovieRepository implements MovieRepository {
  constructor(
    @InjectModel('MongoDBMovie')
    private readonly mongoDBMovieModel: Model<MongoDBMovie>,
  ) {}

  async create(Movie: Movie): Promise<void> {
    try {
      const createdMongoDBMovie = new this.mongoDBMovieModel(Movie.toEntity());
      createdMongoDBMovie.save();
    } catch (error) {
      throw new BadRequestException('Movie already exists');
    }
  }

  async findById(id: string): Promise<Movie | null> {
    const mongoDBMovie = await this.mongoDBMovieModel.findById(id).exec();
    if (!mongoDBMovie) {
      return null;
    }
    return Movie.createFromPersistence(mongoDBMovie.toJSON());
  }

  async findOne(options: Partial<MovieInterface>): Promise<Movie | null> {
    const mongoDBMovie = await this.mongoDBMovieModel.findOne(options).exec();
    if (!mongoDBMovie) {
      return null;
    }
    return Movie.createFromPersistence(mongoDBMovie.toJSON());
  }

  async findAll(): Promise<Movie[]> {
    const mongoDBMovies = await this.mongoDBMovieModel.find().exec();
    return mongoDBMovies.map((mongoDBMovie) =>
      Movie.createFromPersistence({
        ...mongoDBMovie.toJSON(),
        likesCount: mongoDBMovie.userLikesIds.length,
      }),
    );
  }

  async update(Movie: Movie): Promise<void> {
    const movieEntity = Movie.toEntity();
    await this.mongoDBMovieModel
      .updateOne({ imdbId: Movie.getImdbId() }, movieEntity)
      .exec();
  }

  async getMostLikedMovies(): Promise<Movie[]> {
    const pipeline = this.generatePipeline();
    const mongoDBMovies = await this.mongoDBMovieModel
      .aggregate(pipeline)
      .exec();
    return mongoDBMovies.map((mongoDBMovie) =>
      Movie.createFromPersistence(mongoDBMovie as MovieInterface),
    );
  }

  private generatePipeline(): PipelineStage[] {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          $expr: {
            $gt: [{ $size: '$userLikesIds' }, 0],
          },
        },
      },
      {
        $addFields: {
          likesCount: { $size: '$userLikesIds' },
        },
      },
      {
        $sort: {
          likesCount: -1,
        },
      },
      {
        $limit: 10,
      },
    ];

    return pipeline;
  }
}
