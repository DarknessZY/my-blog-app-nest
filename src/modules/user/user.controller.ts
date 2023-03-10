import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService) {

  }
  //注册
  @ApiOperation({ summary: '注册用户' })
  @Post('register')
  async register(@Body() createUser:any) {
     return await this.userService.register(createUser);
   }

  //登录
  @ApiOperation({ summary: '登录' })
  @Post('login')
  async login(@Body() loginInfo:any) {
    return await this.userService.login(loginInfo);
  }  
}
