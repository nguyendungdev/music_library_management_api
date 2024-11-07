// src/dtos/create-playlist.dto.ts
import { IsString, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class CreatePlaylistDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    albumCover?: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    tracks?: string[];
}