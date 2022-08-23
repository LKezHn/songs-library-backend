import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService 
  ) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) : Promise<User> {
    createUserDto.password = await this.authService.encryptPassword(createUserDto.password)
    return this.userService.create(createUserDto)
  }

  @Get('user')
  findAll() : Promise<User[]>{
    return this.userService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id', ParseIntPipe) id: number) : Promise<User> {
    return this.userService.findOne(+id);
  }

  @Patch('user/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) : Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('user/:id')
  remove(@Param('id', ParseIntPipe) id: number) : Promise<{}> {
    return this.userService.remove(+id);
  }
}
