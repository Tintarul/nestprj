import { Controller, Get, Post, Body, Res, Req, Patch, HttpStatus, Render, Param, Delete, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { UserPipePipe } from '../user-pipe/user-pipe.pipe';
import { UserGuard } from './user.guard';
import { UserInterceptor } from './user.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async findOrCreate(@Body() createUserDto: CreateUserDto, @Res() response) {
    let usersResponse = await this.userService.findUserByUsername(createUserDto.username);
    if (!usersResponse) {
      this.userService.createUser(createUserDto);
    } else {
      this.userService.updateUser(usersResponse.id, createUserDto);
    }
    let allUsers = await this.userService.findAllUser();
    return response.status(HttpStatus.OK).render('users', {Utilizatori: allUsers});
  }

  @Get()
  @UseInterceptors(UserInterceptor)
  async findAll(@Res() response, @Req() request) {
    const usersResponse = await this.userService.findAllUser();
    if (request.session.user) {
      return response.status(HttpStatus.OK).render('users', {Utilizatori: usersResponse, myuser: request.session.user});
    } else {
      return response.status(HttpStatus.OK).render('users', {Utilizatori: usersResponse});
    }
  }

  @Get('protected')
  @UseGuards(UserGuard)
  @UseInterceptors(UserInterceptor)
  async protectedRoute(@Res() response, @Req() request) {
    const usersResponse = await this.userService.findAllUser();
    return response.status(HttpStatus.OK).render('users', {message: 'Felicitari, esti pe o ruta protejata', Utilizatori: usersResponse, myuser: request.session.user});
  }


  @Get('logout')
  async logout(@Res() response, @Req() request) {
    request.session.destroy();
    const usersResponse = await this.userService.findAllUser();
    return response.status(HttpStatus.OK).render('users', {message: 'Delogat cu succes', Utilizatori: usersResponse});
  }

  @Get('/login')
  @UseInterceptors(UserInterceptor)
  renderLogin(@Req() request, @Res() response) {
    return response.status(HttpStatus.OK).render('login');
  }

  @Post('/login')
  @UseInterceptors(UserInterceptor)
  async login(@Body() loginUserDto: LoginUserDto, @Res() response, @Req() request) {
    let usersResponse = await this.userService.findUserByUsername(loginUserDto.username);
    if (!usersResponse) {
      return response.status(HttpStatus.OK).render('login', {message: 'Userul nu exista'});
    } else {
      if (usersResponse.password === loginUserDto.password) {

        request.session.user = usersResponse;
        let allUsers = await this.userService.findAllUser();
        return response.status(HttpStatus.OK).render('users', {Utilizatori: allUsers, myuser: request.session.user, message: 'Logat cu succes'});

      } else {
        return response.status(HttpStatus.OK).render('login', {message: 'Parola gresita'});
      }
    }
  }

  @Get('/form')
  @UseInterceptors(UserInterceptor)
  @Render('userForm')
  renderForm() {
    return {};
  }

  @Get(':id')
  @UseInterceptors(UserInterceptor)
  //Aici folosim un pipe pentru a verifica daca id este string
  @UsePipes(new UserPipePipe())
  async findOne(@Param('id', UserPipePipe) id: string, @Res() response) {
    const usersResponse = await this.userService.findUser(+id);
    return response.status(HttpStatus.OK).render('userForm', {user: usersResponse});
  }

  //Am folosit delete pentru a sterge un user
  @Delete(':id')
  @UseInterceptors(UserInterceptor)
  @UsePipes(new UserPipePipe())
  remove(@Param('id', UserPipePipe) id: string) {
    return this.userService.removeUser(+id);
  }
}
