import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors, HttpCode, HttpStatus, BadRequestException, Res, Query, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dtos/create-track.dto';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CommonDescription } from 'src/common/constants/descriptions.constants';
import { ErrorResponse } from 'src/common/dto/response.dto';
import { multerConfig } from 'src/configs/multer.config';
import { Response } from 'express';
import { GetQueryDto } from 'src/common/dto/getQueryDto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { Schema as MongooseSchema } from "mongoose";


@Controller('tracks')
export class TracksController {
    constructor(private readonly tracksService: TracksService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('mp3File', multerConfig))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'Title of the track' },
                artist: { type: 'string', description: 'Artist of the track' },
                album: { type: 'string', description: 'Album name of the track' },
                genre: { type: 'string', description: 'Genre of the track' },
                releaseYear: { type: 'number', description: 'Release year of the track' },
                mp3File: {
                    type: 'string',
                    format: 'binary',
                    description: 'MP3 file to upload',
                },
            },
        },
    })
    @ApiOperation({ summary: 'Upload a new track' })
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
    async create(@UploadedFile() file: Express.Multer.File, @Body() createTrackDto: CreateTrackDto) {
        return this.tracksService.create(createTrackDto, file);

    }

    @Get()
    async findAll(@Query() query: GetQueryDto) {
        return this.tracksService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.tracksService.findOne(id);
        } catch (error) {
            throw new Error('Failed to fetch track: ' + error.message);
        }
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('mp3File', multerConfig))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'Title of the track' },
                artist: { type: 'string', description: 'Artist of the track' },
                album: { type: 'string', description: 'Album name of the track' },
                genre: { type: 'string', description: 'Genre of the track' },
                releaseYear: { type: 'number', description: 'Release year of the track' },
                mp3File: {
                    type: 'string',
                    format: 'binary',
                    description: 'MP3 file to upload',
                },
            },
        },
    })
    @ApiOperation({ summary: 'Update an existing track' })
    @ApiOkResponse({
        description: 'Track updated successfully',
    })
    @ApiNotFoundResponse({
        description: 'Track not found',
    })
    async updateTrack(
        @Param('id') id: string,
        @Body() updateTrackDto: UpdateTrackDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const track = await this.tracksService.update(id, updateTrackDto, file);
        if (!track) {
            throw new NotFoundException(`Track with ID ${id} not found`);
        }
        return track;
    }

    @Delete(':id')
    async remove(@Param('id') id: MongooseSchema.Types.ObjectId) {
        try {
            await this.tracksService.deleteTrack(id);
        } catch (error) {
            throw new Error('Failed to delete track: ' + error.message);
        }
    }
}
