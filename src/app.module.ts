import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cursos} from './models/cursos';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'emeb_db',
      entities: [Cursos],
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([Cursos]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
