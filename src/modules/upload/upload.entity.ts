import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:''})
  filename: string;

  @Column({default:''})
  mimetype: string;

  @Column('int')
  size: number;

  @Column('varchar')
  imgurl: string
}