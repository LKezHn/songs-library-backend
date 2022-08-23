import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

    private prisma = new PrismaClient();

    async encryptPassword(password: string): Promise<string> {
        const newPassword = await hash(password, 10);
        return newPassword;
    }

    async passwordIsCorrect(password: string, hash: string): Promise<boolean> {
        return compare(password, hash)
    }

}
