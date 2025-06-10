import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCropDto } from '../../crops/dto/create-crop.dto';
import { IsValidArea } from '../../validators/is-valid-area.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmDto {
  @ApiProperty({
    example: 'Fazenda Boa Terra',
    description: 'Nome da fazenda',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Campinas',
    description: 'Cidade onde está localizada a fazenda',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'SP',
    description: 'Estado onde está localizada a fazenda',
  })
  @IsString()
  state: string;

  @ApiProperty({
    example: 60,
    description: 'Área destinada à agricultura (hectares)',
  })
  @Type(() => Number)
  @IsNumber()
  farmingArea: number;

  @ApiProperty({
    example: 40,
    description: 'Área com vegetação nativa preservada (hectares)',
  })
  @Type(() => Number)
  @IsNumber()
  vegetationArea: number;

  @ApiProperty({
    example: 100,
    description: 'Área total da fazenda (hectares)',
  })
  @Type(() => Number)
  @IsNumber()
  @IsValidArea({
    message:
      'A soma de farmingArea e vegetationArea não pode ultrapassar totalArea.',
  })
  totalArea: number;

  @ApiProperty({
    type: [CreateCropDto],
    description: 'Cultura(s) plantada(s) na fazenda',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCropDto)
  crops: CreateCropDto[];
}
