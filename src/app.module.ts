import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entity/item.entity';
import { Coupon } from './entity/coupon.entity';
import { Discount } from './entity/discount.entity';
import { Campaign } from './entity/campaign.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './test.db',
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: process.env.NODE_ENV != 'production',
    }),
    TypeOrmModule.forFeature([Item, Coupon, Discount, Campaign]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
