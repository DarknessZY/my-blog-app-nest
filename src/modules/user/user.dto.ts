import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({ description: '昵称' })
  readonly nickname: string;

  @ApiProperty({ description: '头像' })
  readonly avatar: string;

  @ApiProperty({ description: '手机号' })
  readonly mobile: string;

  @IsNotEmpty({ message: '密码没填' })
  @ApiProperty({ description: '密码' })
  readonly password: string;
}

export class LoginInfoDTO {
  @IsNotEmpty({ message: '手机号没填' })
  @ApiProperty({ description: '手机号' })
  readonly mobile: string;

  @IsNotEmpty({ message: '密码没填' })
  @ApiProperty({ description: '密码' })
  readonly password: string;
}