import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UploadDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;
}