import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ limit: 10, ttl: 60 }]),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
      auth: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
      },
    }),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    // MongooseModule.forRootAsync({
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get('DATABASE_URI'),
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
