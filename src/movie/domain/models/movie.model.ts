export interface MovieInterface {
  id?: string;
  imdbId: string;
  title: string;
  description: string;
  userLikesIds?: string[];
  likesCount?: number;
}

export class Movie {
  private id?: string;
  private imdbId: string;
  private title: string;
  private description: string;
  private userLikesIds?: string[];
  private likesCount?: number;

  private constructor(movie: MovieInterface) {
    this.id = movie?.id;
    this.imdbId = movie.imdbId;
    this.title = movie.title;
    this.description = movie.description;
    this.userLikesIds = movie.userLikesIds || [];
    this.likesCount = movie.likesCount;
  }

  public static create(movie: MovieInterface): Movie {
    return new Movie(movie);
  }

  public static createFromPersistence(movie: MovieInterface): Movie {
    return new Movie(movie);
  }

  receiveLike(userId: string): void {
    if (this.userLikesIds?.includes(userId)) {
      return;
    }
    this.userLikesIds?.push(userId);
    this.likesCount = this.userLikesIds?.length;
  }

  public getId(): string {
    return this.id;
  }

  public getImdbId(): string {
    return this.imdbId;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getLikesCount(): number {
    return this.likesCount;
  }

  public getUserLikesIds(): string[] {
    return this.userLikesIds;
  }

  public toEntity(): MovieInterface {
    return {
      imdbId: this.getImdbId(),
      title: this.getTitle(),
      description: this.getDescription(),
      userLikesIds: this.getUserLikesIds(),
    };
  }

  public toJson(): MovieInterface {
    return {
      id: this.getId(),
      imdbId: this.getImdbId(),
      title: this.getTitle(),
      description: this.getDescription(),
      userLikesIds: this.getUserLikesIds(),
      likesCount: this.getLikesCount(),
    };
  }
}
