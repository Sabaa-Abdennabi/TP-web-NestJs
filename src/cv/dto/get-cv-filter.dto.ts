import { IsOptional, IsString } from 'class-validator';

export class GetCvFilterDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  age: number;
}
