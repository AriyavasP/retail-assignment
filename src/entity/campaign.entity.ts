import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  campaignId: number;

  @Column('datetime')
  campaignDateStart: Date;

  @Column('datetime')
  campaignDateEnd: Date;

  @Column()
  campaignType: string;

  @Column('decimal', { precision: 10, scale: 2 })
  campaignAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  campaignEveryAmount: number;
}
