import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString({ message: 'El username debe ser un texto válido' })
  username?: string;

  @IsString({ message: 'La contraseña debe ser un texto válido' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @IsString({ message: 'El número de teléfono debe ser un texto válido' })
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  @Matches(/^[0-9]{10,15}$/, {
    message:
      'El número de teléfono debe contener entre 10 y 15 dígitos y solo números',
  })
  phoneNumber: string;
}
