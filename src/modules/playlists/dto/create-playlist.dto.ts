import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class CreatePlaylistDto {

    @ApiProperty({
        type: 'string',
    })
    @IsString()
    title: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        required: false,
    })
    @IsOptional()
    albumCover?: string;

    @ApiProperty({ type: [String] })
    @IsOptional()
    tracks?: string[];
}