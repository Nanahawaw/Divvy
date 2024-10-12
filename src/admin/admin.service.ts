import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminLoginDto } from './dto/admin-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async adminLogin(loginDto: AdminLoginDto) {
    const exisingAdmin = await this.adminRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!exisingAdmin) {
      throw new NotFoundException('Admin not found');
    }
    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      exisingAdmin.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }
    //if all checks pass, generate accessToken
    const payload = { sub: exisingAdmin.id, email: exisingAdmin.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async inViteAdmin() {}

  async getResponses() {}
}
