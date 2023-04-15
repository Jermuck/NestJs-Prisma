import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/controllers/auth/auth.module';
import { IOModule } from './infrastructure/controllers/IO/event.module';
import { PostModule } from './infrastructure/controllers/post/post.module';
import { UserModule } from './infrastructure/controllers/user/user.module';

@Module({
  imports: [
    AuthModule,
    PostModule,
    IOModule,
    UserModule
  ]
})
export class AppModule { }
