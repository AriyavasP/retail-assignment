import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Discount } from './discount.entity';
import { Coupon } from './coupon.entity';
import { ItemType } from './itemType.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  itemId: number;

  @Column()
  itemCode: string;

  @Column('decimal', { precision: 10, scale: 2 })
  itemPrice: number;

  @ManyToOne(() => Discount, discount => discount.items)
  discount: Discount;

  @ManyToOne(() => Coupon, coupon => coupon.items)
  coupon: Coupon;

  @ManyToOne(() => ItemType, itemType => itemType.items)
  itemType: ItemType;
}
