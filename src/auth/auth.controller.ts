import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }


  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) : Promise<{}> {
    
    const user = await this.userService.exists(loginUserDto)

    if(user !== null){
      if(this.authService.passwordIsCorrect(loginUserDto.password, user.password)) {
        return user
      }
    }
    return { message: "Incorrect email"}
  }
}
