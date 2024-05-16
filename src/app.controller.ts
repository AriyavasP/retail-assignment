import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CartList, GetItemList, PurchaseItem } from './models/item.model';

@Controller('/api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/item')
  async getItemList(@Query() query: GetItemList) {
    try {
      const result = await this.appService.getItemList(query.itemTypeId);
      const modelRes = {
        data: result,
      };
      return modelRes;
    } catch (error) {
      throw error;
    }
  }

  @Get('/coupon')
  async getCoupon() {
    try {
      const result = await this.appService.getCoupon();
      const modelRes = {
        data: result,
      };
      return modelRes;
    } catch (error) {
      throw error;
    }
  }

  @Post('/purchase')
  async buyItem(@Body() body: PurchaseItem) {
    try {
      const result = await this.appService.summaryCalculate(body);
      const modelRes = {
        data: result,
      };
      return modelRes;
    } catch (error) {
      throw error;
    }
  }
}
