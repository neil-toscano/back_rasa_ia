import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  text?: string;
}
