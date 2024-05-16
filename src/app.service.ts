import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entity/item.entity';
import { In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PurchaseItem } from './models/item.model';
import { Coupon } from './entity/coupon.entity';
import { Discount } from './entity/discount.entity';
import { Campaign } from './entity/campaign.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async getItemList(category: number): Promise<Item[]> {
    try {
      let data: Item[];
      if (category) {
        data = await this.itemRepository.find({
          where: {
            itemType: {
              itemTypeId: category,
            },
          },
        });
      } else {
        data = await this.itemRepository.find();
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async summaryCalculate(purchaseData: PurchaseItem) {
    try {
      let price: number = purchaseData.cartList.reduce((a, b) => {
        return a + b.price * b.quantity;
      }, 0);
      let discountModel = {
        coupon: 0,
        onTop: 0,
        member: 0,
        seasonal: 0,
        lastedDiscount: 0,
      };
      let where;
      // section one coupon
      where = purchaseData.coupon;
      const coupon = await this.couponRepository.findOne({
        where: {
          couponCode: where,
        },
      });

      if (coupon) {
        let amountDis =
          coupon.couponFixed == 1
            ? coupon.couponAmount
            : coupon.couponAmount *
              purchaseData.cartList.reduce((a, b) => {
                return a + b.price * b.quantity;
              }, 0);
        discountModel.coupon = amountDis;
      }
      price = price - discountModel.coupon;

      // section two on top
      where = purchaseData.cartList.map((item) => item.itemId);
      const itemDiscount = await this.itemRepository.find({
        where: {
          itemId: In(where),
        },
        relations: ['discount', 'itemType', 'itemType.memberPointDiscount'],
        select: {
          itemId: true,
          itemPrice: true,
          discount: {
            discountAmount: true,
            itemType: {
              itemTypeId: true,
              memberPointDiscount: {
                memberPointComparePrice: true,
              },
            },
          },
        },
      });

      if (itemDiscount) {
        const { totalPriceForEachItem, memberDiscount } =
          this.calculateDiscount(
            purchaseData,
            itemDiscount,
            discountModel.coupon,
          );
        discountModel.onTop = totalPriceForEachItem.reduce(
          (a, b) => a + b.discountPrice,
          0,
        );
        discountModel.member = memberDiscount.memberDiscount;
      }
      price = price - (discountModel.member + discountModel.onTop);

      //section three
      const currentDate = new Date();
      const campaing = await this.campaignRepository.find({
        where: {
          campaignDateStart: LessThanOrEqual(currentDate),
          campaignDateEnd: MoreThanOrEqual(currentDate),
        },
      });
      discountModel.seasonal = campaing.map((item) => {
        let round = Math.floor(price / item.campaignEveryAmount);
        return round * item.campaignAmount;
      }).reduce((a,b) => a + b, 0);
      discountModel.lastedDiscount = price - discountModel.seasonal;

      return discountModel;
    } catch (error) {
      throw error;
    }
  }

  calculateDiscount(
    purchaseData: PurchaseItem,
    itemDiscount,
    disCoupon: number,
  ) {
    try {
      let memberDiscount: number;
      let totalPriceForEachItem = purchaseData.cartList.map((cartItem) => {
        const itemData = itemDiscount.find(
          (item) => item.itemId === cartItem.itemId,
        );

        if (itemData) {
          memberDiscount =
            itemData.itemType.memberPointDiscount.memberPointComparePrice;
          const totalPrice = cartItem.quantity * itemData.itemPrice;
          const discountedPrice =
            itemData.discount.discountAmount * (totalPrice - disCoupon);

          return {
            itemId: cartItem.itemId,
            discountPrice: discountedPrice,
          };
        } else {
          return {
            itemId: cartItem.itemId,
            discountPrice: 0,
          };
        }
      });

      let mDiscount;
      // check member point discount
      if (purchaseData.memberPoint) {
        let sumPrice =
          purchaseData.cartList.reduce((a, b) => {
            return a + b.price * b.quantity;
          }, 0) - disCoupon;
        const percentage = purchaseData.memberPoint / sumPrice;
        const maxDiscountMember = memberDiscount * sumPrice;
        memberDiscount =
          memberDiscount > percentage
            ? sumPrice * percentage
            : maxDiscountMember;
        mDiscount = {
          memberDiscount: memberDiscount,
        };
      } else {
        mDiscount = {
          memberDiscount: 0,
        };
      }

      return { totalPriceForEachItem, memberDiscount: mDiscount };
    } catch (error) {
      throw error;
    }
  }
}
