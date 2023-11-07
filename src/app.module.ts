import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UserEntity } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { UploadModule } from './modules/upload/upload.module'
import { Image } from './modules/upload/upload.entity'
import { EventsGateway } from './events/events.gateway';
import envConfig from '../config/env';
@Module({
  imports: [
    ConfigModule.forRoot({ 
      ignoreEnvFile: false, // 忽视默认读取.env的文件配置
      isGlobal: true, // 全局注入
      envFilePath: [envConfig.path] , // 加载配置文件
     }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          type: 'mysql', // 数据库类型
          entities: [UserEntity,Image],  // 数据表实体
          host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
          port: configService.get<number>('DB_PORT', 3306), // 端口号
          username: configService.get('DB_USER', 'root'),   // 用户名
          password: configService.get('DB_PASSWORD', '123456'), // 密码
          database: configService.get('DB_DATABASE', 'myblog'), //数据库名
          timezone: '+08:00', //服务器上配置的时区
          synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
          autoLoadEntities: true,
        }),
      }),
      UserModule,
      UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
