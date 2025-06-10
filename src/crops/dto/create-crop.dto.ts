import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCropDto {
  @ApiProperty({
    example: 'Soja',
    description: 'Nome da cultura plantada',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Safra 2023',
    description: 'Safra referente à cultura',
  })
  @IsString()
  season: string;
}
