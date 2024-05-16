// src/coupons/coupon.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  couponId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  couponFixed: number;

  @Column('decimal', { precision: 10, scale: 2 })
  couponAmount: number;

  @Column()
  couponCode: string;

  @OneToMany(() => Item, item => item.coupon)
  items: Item[];
}
