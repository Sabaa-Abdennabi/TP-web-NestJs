import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class GetCvFilterDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  age: number;
}
