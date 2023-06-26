import { Movie, MovieInterface } from './movie.model';

describe('MovieModel', () => {
  it('should create an instance', () => {
    // Arrange
    const movie = generateMovie();

    // Act
    const result = Movie.create(movie);

    // Assert
    expect(result).toBeDefined();
  });

  it('should create an instance from persistence', () => {
    // Arrange
    const movie = generateMovieFromDb();

    // Act
    const result = Movie.createFromPersistence(movie);

    // Assert
    expect(result).toBeDefined();
  });

  it('should receive a like', () => {
    // Arrange
    const movie = generateMovieFromDb();

    // Act
    const result = Movie.createFromPersistence(movie);
    result.receiveLike('1234567890');

    // Assert
    expect(result.getLikesCount()).toBe(1);
  });

  it('should NOT receive a like WHEN user already liked', () => {
    // Arrange
    const movie = generateMovieFromDb();

    // Act
    const result = Movie.createFromPersistence(movie);
    result.receiveLike('1234567890');
    result.receiveLike('1234567890');

    // Assert
    expect(result.getLikesCount()).toBe(1);
  });

  it('should return the entity', () => {
    // Arrange
    const movie = generateMovieFromDb();

    // Act
    const result = Movie.createFromPersistence(movie);
    const entity = result.toEntity();

    // Assert
    expect(entity).toBeDefined();
  });

  it('should return the json', () => {
    // Arrange
    const movie = generateMovieFromDb();

    // Act
    const result = Movie.createFromPersistence(movie);
    const json = result.toJson();

    // Assert
    expect(json).toBeDefined();
  });
});

function generateMovie(): MovieInterface {
  return {
    imdbId: 'tt1234567',
    title: 'Test Movie',
    description: 'This is a test movie',
  };
}

function generateMovieFromDb(): MovieInterface {
  return {
    id: '1234567890',
    imdbId: 'tt1234567',
    title: 'Test Movie',
    description: 'This is a test movie',
    likesCount: 0,
    userLikesIds: [],
  };
}
