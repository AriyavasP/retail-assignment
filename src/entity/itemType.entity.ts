import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { MemberPointDiscount } from './memberPointDiscount.entity';
import { Item } from './item.entity';
import { Discount } from './discount.entity';

@Entity()
export class ItemType {
  @PrimaryGeneratedColumn()
  itemTypeId: number;

  @Column()
  itemTypeName: string;

  @ManyToOne(() => MemberPointDiscount, memberPointDiscount => memberPointDiscount.itemTypes)
  memberPointDiscount: MemberPointDiscount;

  @OneToMany(() => Item, item => item.itemType)
  items: Item[];

  @OneToMany(() => Discount, discount => discount.itemType)
  discounts: Discount[];
}
