// src/services/tracks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track } from './schemas/track.schema';
import { CreateTrackDto } from './dtos/create-track.dto';

@Injectable()
export class TracksService {
    constructor(@InjectModel(Track.name) private trackModel: Model<Track>) { }

    async create(createTrackDto: CreateTrackDto, mp3File: string): Promise<Track> {
        const createdTrack = new this.trackModel({ ...createTrackDto, mp3File });
        return createdTrack.save();
    }

    async findAll(): Promise<Track[]> {
        return this.trackModel.find().exec();
    }

    async findOne(id: string): Promise<Track> {
        const track = await this.trackModel.findById(id).exec();
        if (!track) {
            throw new NotFoundException(`Track with ID ${id} not found`);
        }
        return track;
    }

    async update(id: string, updateTrackDto: CreateTrackDto): Promise<Track> {
        const updatedTrack = await this.trackModel.findByIdAndUpdate(id, updateTrackDto, { new: true }).exec();
        if (!updatedTrack) {
            throw new NotFoundException(`Track with ID ${id} not found`);
        }
        return updatedTrack;
    }

    async remove(id: string): Promise<void> {
        const result = await this.trackModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Track with ID ${id} not found`);
        }
    }
}