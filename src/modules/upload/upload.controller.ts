import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDto } from './upload.dto';
import { UploadService } from './upload.service';
import { MulterFile } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: MulterFile): Promise<{ imgurl: string,id: number }> {
    const uploadDto: UploadDto = {
      filename: file.originalname,
      size: file.size,
    };
    const { imgurl,id} = await this.uploadService.uploadFile(uploadDto, file);
    return { imgurl,id};
  }

  // @Post('uploadImgs')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadImgs(@UploadedFile() files: MulterFile[]): Promise<Image[]> {
  //   const uploadDto: UploadDto[] = [];
  //   for (const file of files) {
  //     const uploadDtoItem: UploadDto = {
  //       filename: file.originalname,
  //       size: file.size,
  //     };
  //     uploadDto.push(uploadDtoItem);
  //   }
  //   return await this.uploadService.uploadFiles(uploadDto,files);
  // }
 }