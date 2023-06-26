import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/users.module';
import { MovieModule } from './movie/movie.module';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, MovieModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
