import { InjectModel } from "@nestjs/mongoose";
import { Track } from "./schemas/track.schema";
import { Model, Schema as MongooseSchema } from "mongoose";
import { CreateTrackDto } from "./dtos/create-track.dto";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UpdateTrackDto } from "./dtos/update-track.dto";
import { GetQueryDto } from "src/common/dto/getQueryDto";


export class TrackRepository {
    constructor(@InjectModel(Track.name) private readonly trackModel: Model<Track>) { }

    async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
        const createdTrack = new this.trackModel(createTrackDto);
        return createdTrack.save();
    }

    async updateTrack(id: string, updateTrackDto: UpdateTrackDto, fileUrl?: string): Promise<Track> {
        const track = await this.trackModel.findById(id).exec();
        if (!track) {
            throw new NotFoundException(`Track with ID ${id} not found`);
        }

        if (fileUrl) {
            track.mp3File = fileUrl;
        }

        Object.assign(track, updateTrackDto);
        return track.save();
    }

    async getTrackById(id: MongooseSchema.Types.ObjectId) {
        let track;
        try {
            track = await this.trackModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!track) {
            throw new NotFoundException('The track with this id does not exist');
        }

        return track;
    }
    async deleteTrack(id: MongooseSchema.Types.ObjectId): Promise<any> {
        return this.trackModel.deleteOne({ _id: id }).exec();
    }

    async getTracks(query: GetQueryDto): Promise<any> {
        const from = Number(query.from) || 0;
        const limit = Number(query.limit) || 0;
        try {
            const queryBuilder = this.trackModel.find().skip(from).sort({ createdAt: -1 });

            if (limit > 0) {
                queryBuilder.limit(limit);
            }

            const tracks = await queryBuilder.lean().exec() as Track[];

            return {
                ok: true,
                data: tracks,
                message: tracks.length > 0 ? 'Get Tracks Ok!' : 'No tracks found',
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}