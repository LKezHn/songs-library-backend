import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  private prisma = new PrismaClient()

  async exists(loginUserDto: LoginUserDto) : Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginUserDto.email
      }
    })

    return user
  }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const newUser = await this.prisma.user.create({
      data: { ...createUserDto }
    })

    return newUser;
  }

  async findAll() : Promise<User[]> {

    const users : User[] = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
      }
    })

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
      }
    })

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<User>{
    
    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: { ... updateUserDto }
    })
    
    return updatedUser;
  }

  async remove(id: number) : Promise<{}> {

    await this.prisma.user.delete({
      where: { id: id }
    })
    
    return { message: "User deleted"};
  }

}
