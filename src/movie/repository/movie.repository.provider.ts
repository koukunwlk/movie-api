import { ClassProvider } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { MongoDBMovieRepository } from './mongodb/mongodb-movie.repository';

export const MovieProvider: ClassProvider = {
  provide: MovieRepository,
  useClass: MongoDBMovieRepository,
};
