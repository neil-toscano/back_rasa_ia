import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'El teléfono debe ser 10-15 dígitos' })
  @IsNotEmpty({ message: 'El teléfono no debe ser vacio' })
  phoneNumber: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @Length(8, 20, {
    message: 'La contraseña debe tener entre 8 y 20 caracteres',
  })
  password: string;
}
