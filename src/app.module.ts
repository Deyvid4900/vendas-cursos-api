import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cursos} from './models/cursos';
import {  Usuarios  as Clientes} from './models/usuarios';
import { UserControllerController } from './user-controller/user-controller.controller';
import { AppServiceUser } from './user-controller/user-controller.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'emeb_db',
      entities: [Cursos,Clientes],
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([Cursos,Clientes]),
    AuthModule,
  ],
  controllers: [AppController, UserControllerController],
  providers: [AppService, AppServiceUser],
})
export class AppModule {}
