import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadDto } from './upload.dto';
import { Image } from './upload.entity';
import { File } from 'multer';
import * as COS from 'cos-nodejs-sdk-v5';

@Injectable()
export class UploadService {
  private cos: COS;

  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {
    this.cos = new COS({
      SecretId: 'AKIDwnSvCSYUfjfOxMZwHSSXSBtTvELNFwSj',
      SecretKey: 'CMNCtPlwwlOrnp9VzUsQwHTTIxTo03yh',
    });
  }

  async uploadFile(uploadDto: UploadDto, file: File): Promise<Image> {
    const image = new Image();
    image.filename = uploadDto.filename;
    image.mimetype = file.mimetype;
    image.size = uploadDto.size;
    image.imgurl = await this.uploadToCos(file)
    return await this.imageRepository.save(image);
  }

  async uploadToCos(file: File): Promise<string> {
    const { originalname, buffer } = file;
    const key = `uploads/${originalname}`;
    return new Promise((resolve, reject) => {
      this.cos.putObject(
        {
          Bucket: 'yaocar-1309702462',
          Region: 'ap-nanjing',
          Key: key,
          Body: buffer,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            console.log('data',data);
            const imgurl = `https://${data.Location}`;
            resolve(imgurl);
          }
        },
      );
    });
  }
}
