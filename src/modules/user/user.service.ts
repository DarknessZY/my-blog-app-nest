import { BadRequestException, HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encryptPassword, makeSalt } from '../../../utils/cryptogram';
import { RegisterDTO , LoginInfoDTO} from './user.dto';
import { UserEntity} from './user.entity'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}
    /**
   * 注册
   * @param  mobile 手机号 
   * @param  password 密码 
   */
    async register(createUser:RegisterDTO):Promise<any>{
      const {mobile,password} = createUser;
      if (!mobile) {
        throw new HttpException('入参缺少mobile', 401);
      }
      const existUser = await this.userRepository.findOne({where: {mobile}});
      if (existUser) {
        throw new HttpException('该用户已注册', 401);
      }
      const newUser = await this.userRepository.create(createUser)
      const salt = makeSalt(); // 制作密码盐
      const hashPassword = encryptPassword(password, salt);  // 加密密码
      newUser.password = hashPassword
      newUser.salt = salt
      // this.userRepository.create(createUser)相当于new User(createUser)只是创建了一个新的用户对象
      // save方法才是执行插入数据
      return await this.userRepository.save(newUser);
    }

    /**
   * 登录检验
   * @param  mobile 手机号 
   * @param  password 密码 
   */
    async checkLoginForm(loginInfo:LoginInfoDTO):Promise<any> {
      const {mobile,password} = loginInfo;
      const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.salt')
        .addSelect('user.password')
        .where('user.mobile = :mobile', { mobile })
        .getOne()
        Logger.log(`user6666:${user.mobile}`)
      if (!user) {
        throw new BadRequestException('用户名不正确！');
      }
      const currentHashPassword = encryptPassword(password, user.salt)
      if (currentHashPassword !== user.password) {
        throw new BadRequestException('密码错误')
      }
      return user
    }

   /**
   * 生成token
   * @param  UserEntity 用户实体类
   */
  async certificate(user:UserEntity){
    const payload = { 
      id: user.id,
      mobile: user.mobile,
    };
    const token = this.jwtService.sign(payload);
    return token
  }

   /**
   * 登录
   */
  async login(loginInfo:LoginInfoDTO):Promise<any> {
    const user = await this.checkLoginForm(loginInfo)
    const token = await this.certificate(user)
    return {
        token
    }
  }
  

}
