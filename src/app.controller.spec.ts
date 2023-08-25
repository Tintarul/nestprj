import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ArticolService } from './Rute/Articole/articole.service';
import { ArticolController } from './Rute/Articole/articole.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController, ArticolController],
      providers: [AppService, ArticolService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    //Aci ar trebui sa fac test la raspuns ? cred ?
  });

  describe('userLogin', () => {
    //Aici ar trebui sa fac test la login fields
  });

});
