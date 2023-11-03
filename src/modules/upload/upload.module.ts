import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Image } from './upload.entity'

@Module({
imports: [
TypeOrmModule.forFeature([Image]),
// MulterModule.register({
// dest: './uploads',
// }),
],
controllers: [UploadController],
providers: [UploadService],
})
export class UploadModule {}