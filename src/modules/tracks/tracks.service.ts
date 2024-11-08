import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Track } from './schemas/track.schema';
import { CreateTrackDto } from './dtos/create-track.dto';
import * as path from 'path';
import * as gad from "get-audio-duration"
import { TrackRepository } from './tracks.repository';
import { GetQueryDto } from 'src/common/dto/getQueryDto';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class TracksService {
    constructor(
        private trackRepository: TrackRepository,
        @InjectModel(Track.name) private trackModel: Model<Track>,
        private readonly fileUploadService: FileUploadService,

    ) { }

    async create(createTrackDto: CreateTrackDto, file: Express.Multer.File): Promise<Track> {
        if (file) {
            const fileUrl = await this.fileUploadService.uploadFile(file.path, file.filename);
            const duration = await this.getAudioDuration(file.path);
            createTrackDto.mp3File = fileUrl;
            createTrackDto.duration = duration;
        }
        return this.trackRepository.createTrack(createTrackDto);
    }

    findAll(getQueryDto: GetQueryDto): Promise<Track[]> {
        return this.trackRepository.getTracks(getQueryDto)
    }

    async findOne(id: string): Promise<Track> {
        const track = await this.trackModel.findById(id);
        if (!track) {
            throw new NotFoundException(`Track with ID ${id} not found`);
        }
        return track;
    }

    async update(id: string, updateTrackDto: Partial<CreateTrackDto>, file?: Express.Multer.File): Promise<Track> {
        let fileUrl: string | undefined;
        if (file) {
            fileUrl = await this.fileUploadService.uploadFile(file.path, file.filename);
        }
        return this.trackRepository.updateTrack(id, updateTrackDto, fileUrl);
    }


    async deleteTrack(id: MongooseSchema.Types.ObjectId): Promise<any> {
        try {
            const result = await this.trackRepository.deleteTrack(id);
            if (result.deletedCount === 0) {
                throw new NotFoundException('The track with this id does not exist');
            }
            return {
                ok: true,
                message: 'Track deleted successfully',
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getAudioDuration(uri: string) {
        let duration
        try {
            duration = await gad.getAudioDurationInSeconds(uri)
        } catch (e) {
            throw new Error("")
        }
        if (duration > 60 * 5) {
            throw new Error("")
        }
        return duration
    }
}