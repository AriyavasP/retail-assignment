import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ItemType } from './itemType.entity';
import { Item } from './item.entity';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  discountId: number;

  @Column()
  discountName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  discountAmount: number;

  @ManyToOne(() => ItemType, itemType => itemType.discounts)
  itemType: ItemType;

  @OneToMany(() => Item, item => item.discount)
  items: Item[];
}
