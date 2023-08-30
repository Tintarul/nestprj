import { Controller, Get, Post, Body, Res, Patch, HttpStatus, Render, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async findOrCreate(@Body() createUserDto: CreateUserDto, @Res() response) {
    const usersResponse = await this.userService.findUserByUsername(createUserDto.username);
    if (!usersResponse) {
      this.userService.createUser(createUserDto);
    } else {
      this.userService.updateUser(usersResponse.id, createUserDto);
    }
    return response.status(HttpStatus.OK).render('userForm', {user: usersResponse});
  }

  @Get()
  @Render('users')
  async findAll(@Res() response) {
    const usersResponse = await this.userService.findAllUser();
    return response.status(HttpStatus.OK).render('users', {Utilizatori: usersResponse});
  }

  @Get('/form')
  @Render('userForm')
  renderForm() {
    return {};
  }

  @Get(':id')
  @Render('userForm')
  async findOne(@Param('id') id: string, @Res() response) {
    const usersResponse = await this.userService.findUser(+id);
    return response.status(HttpStatus.OK).render('userForm', {user: usersResponse});
  }

  @Get('/delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
