import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/movie')
export class MovieController {
  constructor(private readonly moviesService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    console.log(createMovieDto);
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @UseGuards(AuthGuard())
  @Patch(':id/like')
  like(@Request() req, @Param('id') id: string) {
    console.log('user id', req.user.id);
    console.log('movie id', id);
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
