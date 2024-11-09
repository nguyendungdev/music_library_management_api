import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateTrackDto {
    @IsString()
    @Transform(({ value }) => value.toString(), { toClassOnly: true })
    title: string;

    @IsString()
    @Transform(({ value }) => value.toString(), { toClassOnly: true })
    artist: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.toString(), { toClassOnly: true })
    album?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.toString(), { toClassOnly: true })
    genre?: string;

    @IsOptional()
    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear())
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    releaseYear?: number;

    duration?: number;

    mp3File?: string;

    id?: string;
}