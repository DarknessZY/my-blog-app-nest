import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @ApiProperty({ description: '昵称' })
  readonly nickname: string;

  @IsString()
  @ApiProperty({ description: '头像' })
  readonly avatar: string;

  @IsString()
  @ApiProperty({ description: '手机号' })
  readonly mobile: string;

  @IsString()
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