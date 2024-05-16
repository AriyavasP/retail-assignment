import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ItemType } from './itemType.entity';

@Entity()
export class MemberPointDiscount {
  @PrimaryGeneratedColumn()
  memberPointId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  memberPointComparePrice: number;

  @OneToMany(() => ItemType, itemType => itemType.memberPointDiscount)
  itemTypes: ItemType[];
}
