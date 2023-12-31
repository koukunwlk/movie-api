import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieRepository } from './repository/movie.repository';
import { Movie } from './domain/models/movie.model';

@Injectable()
export class MovieService {
  constructor(
    @Inject(MovieRepository) private readonly movieRepository: MovieRepository,
  ) {}
  async create(createMovieDto: CreateMovieDto) {
    const movie = Movie.create(createMovieDto);
    await this.movieRepository.create(movie);
  }

  async findAll() {
    return await this.movieRepository.findAll();
  }

  async findById(id: string) {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      throw new BadRequestException('Filme não encontrado');
    }
    return movie;
  }

  findByImdbId(imdbId: string) {
    return this.movieRepository.findOne({ imdbId });
  }

  async mostLikedMovies() {
    const mostLikedMovies = await this.movieRepository.getMostLikedMovies();
    return mostLikedMovies;
  }

  async like(movieId: string, userId: string) {
    const movie = await this.findByImdbId(movieId);
    if (!movie) {
      throw new BadRequestException('Filme não encontrado');
    }
    movie.receiveLike(userId);
    await this.movieRepository.update(movie);
  }
}
