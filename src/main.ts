import { NestFactory } from '@nestjs/core';
import { AppModule} from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 8090;
const PREFIX = process.env.PREFIX || '/api';
Logger.log(`PREFIX:${PREFIX}`)
async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule);
  // 设置全局路由前缀
  app.setGlobalPrefix(`${PREFIX}`);
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
   // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')   
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, () => {
    logger.log(`服务已经启动,接口请访问:http://wwww.localhost:${PORT}/${PREFIX}`);
  });
}
bootstrap();
