import { PartialType } from '@nestjs/mapped-types';
import { CreateRasaiaDto } from './create-rasaia.dto';

export class UpdateRasaiaDto extends PartialType(CreateRasaiaDto) {}
