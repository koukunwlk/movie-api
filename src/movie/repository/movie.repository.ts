import { Movie, MovieInterface } from '../domain/models/movie.model';

export abstract class MovieRepository {
  abstract create: (movie: Movie) => Promise<void>;
  abstract findOne: (options: Partial<MovieInterface>) => Promise<Movie | null>;
  abstract findById: (id: string) => Promise<Movie | null>;
  abstract findAll: () => Promise<Movie[]>;
  abstract update: (movie: Movie) => Promise<void>;
  abstract getMostLikedMovies: () => Promise<Movie[]>;
}
