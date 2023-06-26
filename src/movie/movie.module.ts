import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieProvider } from './repository/movie.repository.provider';
import {
  MongoDBMovie,
  MongoDBMovieSchema,
} from './repository/mongodb/entities/mongodb-movie.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MongoDBMovie.name,
        schema: MongoDBMovieSchema,
        collection: 'movies',
      },
    ]),
    AuthModule,
  ],
  controllers: [MovieController],
  providers: [MovieService, MovieProvider],
})
export class MovieModule {}
