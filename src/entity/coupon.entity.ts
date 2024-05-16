// src/coupons/coupon.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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
}
