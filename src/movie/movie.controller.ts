import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie')
export class MovieController {
  constructor(private readonly moviesService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @UseGuards(AuthGuard())
  @Post(':id/like')
  like(@Request() req, @Param('id') id: string) {
    return this.moviesService.like(id, req.user.id);
  }

  @Get('most-liked')
  mostLikedMovies() {
    return this.moviesService.mostLikedMovies();
  }

  @Get(':imdbId')
  findByImdbId(@Param('imdbId') imdbId: string) {
    return this.moviesService.findByImdbId(imdbId);
  }
}
