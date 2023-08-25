import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ArticolSchema } from './Modele/articole.schema';
import { ArticolService } from './Rute/Articole/articole.service';
import { ArticolController } from './Rute/Articole/articole.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/dbs'),
    MongooseModule.forFeature([{ name: 'Articol', schema: ArticolSchema }]),
  ],
  controllers: [AppController, ArticolController],
  providers: [AppService, ArticolService],
})
export class AppModule {}
