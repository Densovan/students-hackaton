import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/utils/database';
import { BlogModule } from './module/blog/blog.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [DatabaseModule, BlogModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
