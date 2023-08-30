import { Controller, Get, Post, Body, Res, Patch, HttpStatus, Render, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
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
  @Render('users')
  async findOne(@Param('id') id: string, @Res() response) {
    const usersResponse = await this.userService.findUser(+id);
    return response.status(HttpStatus.OK).render('users', {Utilizatori: usersResponse});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
