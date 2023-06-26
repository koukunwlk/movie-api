import { randomUUID } from 'crypto';
import { Movie } from './domain/models/movie.model';
import { MovieService } from './movie.service';
import { MovieRepository } from './repository/movie.repository';

const movieMock = Movie.create({
  imdbId: 'tt1234567',
  title: 'Test Movie',
  description: 'This is a test movie',
});

let moviesMock: Movie[] = [];

class MovieRepositoryMock implements MovieRepository {
  findAll = jest.fn();
  create = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  findById = jest.fn();
  mostLikedMovies = jest.fn();
}

describe('MovieService', () => {
  let movieService: MovieService;
  const movieRepositoryMock = new MovieRepositoryMock();

  beforeEach(async () => {
    moviesMock = [];
    for (let i = 0; i < 5; i++) moviesMock.push(generateMovieMock());
    movieService = new MovieService(movieRepositoryMock);

    movieRepositoryMock.findOne.mockImplementation((options) => {
      const movie = moviesMock.find(
        (movieMock) => movieMock.getImdbId() === options.imdbId,
      );
      return movie ? movie : null;
    });
    movieRepositoryMock.findAll.mockImplementation(() => moviesMock);

    movieRepositoryMock.update.mockImplementation((movie) => {
      const index = moviesMock.findIndex(
        (movieMock) => movieMock.getId() === movie.getId(),
      );
      moviesMock[index] = movie;
    });

    movieRepositoryMock.findById.mockImplementation((id) => {
      const movie = moviesMock.find((movie) => movie.getId() === id);
      return movie ? movie : null;
    });
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });

  describe('create', () => {
    it('should call movieRepository.create', async () => {
      // Arrange
      const movie = await generateMovieDtoMock();

      // Act
      await movieService.create(movie);

      // Assert
      expect(movieRepositoryMock.create).toHaveBeenCalledWith(movieMock);
    });
  });

  describe('findAll', () => {
    it('should call movieRepository.findAll', async () => {
      // Act
      await movieService.findAll();

      // Assert
      expect(movieRepositoryMock.findAll).toHaveBeenCalled();
    });

    it('should return all movies', async () => {
      // Act
      const movies = await movieService.findAll();

      // Assert
      expect(movies.length).toEqual(moviesMock.length);
      expect(movies[0].toJson()).toEqual(moviesMock[0].toJson());
    });
  });

  describe('findById', () => {
    it('should return the movie', async () => {
      // Arrange
      const id = moviesMock[0].getId();

      // Act
      const movie = await movieService.findById(id);
      // Assert
      expect(movieRepositoryMock.findById).toHaveBeenCalledWith(id);
      expect(movie.toJson()).toEqual(moviesMock[0].toJson());
    });

    it('should throw an error if the movie is not found', async () => {
      // Arrange
      const id = 'xpto';

      // Assert
      expect(movieService.findById(id)).rejects.toThrow('Movie not found');
    });
  });

  describe('like', () => {
    it('should call movieRepository.update', async () => {
      // Arrange
      const id = moviesMock[0].getImdbId();

      // Act
      await movieService.like(id, 'user1');

      // Assert
      expect(movieRepositoryMock.update).toHaveBeenCalledTimes(1);
    });
    it('should add the user to the userLikesIds array', async () => {
      // Arrange
      const id = moviesMock[0].getImdbId();

      // Act
      await movieService.like(id, 'user1');

      // Assert
      expect(movieRepositoryMock.update).toHaveBeenCalled();
      expect(moviesMock[0].getUserLikesIds()).toContain('user1');
    });

    it('should increment the likesCount', async () => {
      // Arrange
      const id = moviesMock[0].getImdbId();

      // Act
      await movieService.like(id, 'user1');

      // Assert
      expect(movieRepositoryMock.update).toHaveBeenCalled();
      expect(moviesMock[0].getLikesCount()).toEqual(1);
    });

    it('should throw an error if the movie is not found', async () => {
      // Arrange
      const id = 'xpto';

      // Assert
      expect(movieService.like(id, 'user1')).rejects.toThrow('Movie not found');
    });

    it('should return the most liked movies', async () => {
      //Arrange
      moviesMock[2].receiveLike('user1');
      moviesMock[2].receiveLike('user2');
      moviesMock[1].receiveLike('user1');
      moviesMock[0].receiveLike('user1');

      // Act
      const mostLikedMovies = await movieService.mostLikedMovies();

      // Assert
      expect(mostLikedMovies.length).toEqual(3);
    });
  });
});

function generateMovieDtoMock() {
  return {
    imdbId: 'tt1234567',
    title: 'Test Movie',
    description: 'This is a test movie',
  };
}

function generateMovieMock(index = 0) {
  return Movie.createFromPersistence({
    id: randomUUID(),
    imdbId: `tt123456${index}`,
    title: 'Test Movie',
    description: 'This is a test movie',
    likesCount: 0,
    userLikesIds: [],
  });
}
