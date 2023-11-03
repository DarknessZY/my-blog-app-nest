// 用户实体类
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  // 用户id
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  // 昵称
  @Column({default:''})
  nickname: string;

  //头像
  @Column({default:'https://i.postimg.cc/wjcFjQMD/b.png'})
  avatar: string;
  
  // 手机号
  @Column('text')
  mobile: string;

  // 创建时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  // 更新时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;

  // 加密后的密码
  @Column('text', { select: false })
  password: string;

  // 加密盐
  @Column('text', { select: false })
  salt: string;
}
