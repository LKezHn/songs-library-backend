import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {


    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    fistname?: string;
    
    @IsOptional()
    @IsString()
    lastname?: string;

    @IsOptional()
    @IsString()
    password?: string;

}
