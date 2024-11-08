import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { multerConfig } from 'src/configs/multer.config';

@Controller('playlists')
export class PlaylistsController {
    constructor(private readonly playlistsService: PlaylistsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('album_cover', multerConfig))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'Title of the playlist' },
                album_cover: {
                    type: 'string',
                    format: 'binary',
                    description: 'Album cover image to upload',
                },
                tracks: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of track IDs',
                },
            },
        },
    })
    @ApiOperation({ summary: 'Create a new playlist' })
    @ApiOkResponse({
        description: 'Playlist created successfully',
    })
    async createPlaylist(
        @Body() createPlaylistDto: CreatePlaylistDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.playlistsService.create(createPlaylistDto, file);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all playlists' })
    @ApiOkResponse({
        description: 'Playlists retrieved successfully',
    })
    async findAll() {
        return this.playlistsService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get a playlist by ID' })
    @ApiOkResponse({
        description: 'Playlist retrieved successfully',
    })
    @ApiNotFoundResponse({
        description: 'Playlist not found',
    })
    async findById(@Param('id') id: string) {
        return this.playlistsService.findById(id);
    }


    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('albumCover', multerConfig))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'Title of the playlist' },
                albumCover: {
                    type: 'string',
                    format: 'binary',
                    description: 'Album cover image to upload',
                },
                tracks: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of track IDs',
                },
            },
        },
    })
    @ApiOperation({ summary: 'Update a playlist' })
    @ApiOkResponse({
        description: 'Playlist updated successfully',
    })
    @ApiNotFoundResponse({
        description: 'Playlist not found',
    })
    async updatePlaylist(
        @Param('id') id: string,
        @Body() updatePlaylistDto: UpdatePlaylistDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (file) {
            updatePlaylistDto.albumCover = file.path;
        }
        return this.playlistsService.update(id, updatePlaylistDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a playlist' })
    @ApiOkResponse({
        description: 'Playlist deleted successfully',
    })
    @ApiNotFoundResponse({
        description: 'Playlist not found',
    })
    async deletePlaylist(@Param('id') id: string) {
        return this.playlistsService.delete(id);
    }

    @Post(':id/tracks/:trackId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Add a track to a playlist' })
    @ApiOkResponse({
        description: 'Track added to playlist successfully',
    })
    @ApiNotFoundResponse({
        description: 'Playlist or track not found',
    })
    async addTrackToPlaylist(@Param('id') playlistId: string, @Param('trackId') trackId: string) {
        return this.playlistsService.addTrackToPlaylist(playlistId, trackId);
    }
}