// src/controllers/tracks.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dtos/create-track.dto';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CommonDescription } from 'src/common/constants/descriptions.constants';
import { ErrorResponse } from 'src/common/dto/response.dto';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

@Controller('tracks')
export class TracksController {
    constructor(private readonly tracksService: TracksService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('mp3File'))
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
        console.log(createTrackDto);
        console.log(file);
        try {
            if (!file) {
                throw new BadRequestException('File is required');
            }

            const duration = await this.getDuration(file.buffer);
            console.log(duration);
            const trackData = {
                ...createTrackDto,
                duration,
            };

            return await this.tracksService.create(trackData, file);
        } catch (error) {
            throw new Error('Failed to create track: ' + error.message);
        }
    }

    private getDuration(buffer: Buffer): Promise<number> {
        return new Promise((resolve, reject) => {
            const tempFilePath = join(__dirname, `temp_${Date.now()}.mp3`);
            writeFileSync(tempFilePath, buffer);

            ffmpeg.ffprobe(tempFilePath, (err, metadata) => {
                unlinkSync(tempFilePath); // Clean up the temp file
                if (err) {
                    return reject(err);
                }
                resolve(metadata.format.duration);
            });
        });
    }

    @Get()
    async findAll() {
        try {
            return await this.tracksService.findAll();
        } catch (error) {
            throw new Error('Failed to fetch tracks: ' + error.message);
        }
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
    async update(@Param('id') id: string, @Body() updateTrackDto: CreateTrackDto) {
        try {
            return await this.tracksService.update(id, updateTrackDto);
        } catch (error) {
            throw new Error('Failed to update track: ' + error.message);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            await this.tracksService.remove(id);
        } catch (error) {
            throw new Error('Failed to delete track: ' + error.message);
        }
    }
}