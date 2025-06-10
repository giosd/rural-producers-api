import { IsString, IsArray, ValidateNested, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFarmDto } from '../../farms/dto/create-farm.dto';
import { IsCpfOrCnpj } from '../validators/is-cpf-cnpj.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF ou CNPJ do produtor rural',
  })
  @IsString()
  @Validate(IsCpfOrCnpj)
  document: string;

  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do produtor',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: [CreateFarmDto],
    description: 'Lista de fazendas do produtor',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFarmDto)
  farms: CreateFarmDto[];
}
