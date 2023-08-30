import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUser(id: number): Promise<User | undefined> {
    try {
      return await this.userRepository.findOneBy({id});
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findUser(id); // Check if the user exists
      Object.assign(user, updateUserDto); // Update user properties
      return this.userRepository.save(user); // Save the updated user
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
  }

  async removeUser(id: number): Promise<void> {
    try {
      const user = await this.findUser(id); // Check if the user exists
      await this.userRepository.remove(user);
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
  }
}
