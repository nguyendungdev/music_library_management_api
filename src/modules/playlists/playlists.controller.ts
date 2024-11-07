// src/controllers/playlists.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CommonDescription } from 'src/common/constants/descriptions.constants';
import { ErrorResponse } from 'src/common/dto/response.dto';

@Controller('playlists')
export class PlaylistsController {
    constructor(private readonly playlistsService: PlaylistsService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiConsumes('application/json')
    @ApiBody({ type: CreatePlaylistDto })
    @ApiOperation({ summary: 'Create a new playlist' })
    @ApiOkResponse({
        description: CommonDescription.UPDATE_ITEM_SUCESS,
    })
    @ApiBadRequestResponse({
        description: CommonDescription.BAD_REQUEST,
        type: ErrorResponse,
    })
    @ApiUnauthorizedResponse({
        description: CommonDescription.UNAUTHORIZED,
        type: ErrorResponse,
    })
    @ApiInternalServerErrorResponse({
        description: CommonDescription.INTERNAL_SERVER_ERROR,
        type: ErrorResponse,
    })
    async create(@Body() createPlaylistDto: CreatePlaylistDto) {
        try {
            return await this.playlistsService.create(createPlaylistDto);
        } catch (error) {
            throw new Error('Failed to create playlist: ' + error.message);
        }
    }

    @Get()
    async findAll() {
        try {
            return await this.playlistsService.findAll();
        } catch (error) {
            throw new Error('Failed to fetch playlists: ' + error.message);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.playlistsService.findOne(id);
        } catch (error) {
            throw new Error('Failed to fetch playlist: ' + error.message);
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePlaylistDto: CreatePlaylistDto) {
        try {
            return await this.playlistsService.update(id, updatePlaylistDto);
        } catch (error) {
            throw new Error('Failed to update playlist: ' + error.message);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            await this.playlistsService.remove(id);
        } catch (error) {
            throw new Error('Failed to delete playlist: ' + error.message);
        }
    }
}