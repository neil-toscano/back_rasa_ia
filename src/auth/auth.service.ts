import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    const token = this.getJwtToken({ id: user.id });
    delete user.password;
    return {
      ...user,
      token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, phoneNumber } = loginUserDto;

    const user = await this.usersService.findByPhone(phoneNumber);
    if (!user)
      throw new NotFoundException('username/password no son correctos');
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      throw new NotFoundException('username/password no son correctos');

    const token = this.getJwtToken({ id: user.id });

    delete user.password;
    return {
      ...user,
      token,
    };
  }

  // async checkAuthStatus(user: User) {
  //   delete user.password;
  //   return {
  //     ...user,
  //     token: this.getJwtToken({ id: user.id }),
  //   };
  // }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  // async verifyToken(token: string) {
  //   try {
  //     const decoded = this.jwtService.verify(token);
  //     const user = await this.userService.findOne(decoded.id);
  //     if (user) {
  //       user.isVerified = true;
  //       return await this.userService.updateVerify(user);
  //     }
  //   } catch (error) {
  //     throw new UnauthorizedException('El token ha expirado, genere nuevo Url');
  //   }
  // }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
