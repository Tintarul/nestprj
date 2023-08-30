import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ArticolSchema } from './Modele/articole.schema';
import { ArticolService } from './Rute/Articole/articole.service';
import { ArticolController } from './Rute/Articole/articole.controller';

import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '12345678', // Parola mea de la postgres
      username: 'postgres',
      entities: [User],
      database: 'bgd',
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User]),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/dbs'), // Am pastrat si mongoose
    MongooseModule.forFeature([{ name: 'Articol', schema: ArticolSchema }]),
  ],
  controllers: [AppController, ArticolController, UserController],
  providers: [AppService, ArticolService, UserService],
})
export class AppModule {}
