// src/dtos/create-track.dto.ts
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateTrackDto {


    @IsString()
    title: string;

    @IsString()
    artist: string;

    @IsOptional()
    @IsString()
    album?: string;

    @IsOptional()
    @IsString()
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