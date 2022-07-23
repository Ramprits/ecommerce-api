import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string' })
  @IsEmail({
    message: 'Please enter valid email address',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  profile_pic_url: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  contact_no: string;
}
