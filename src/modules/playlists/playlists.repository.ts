// src/playlists.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Playlist } from './schemas/playlist.schema';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistRepository {
    constructor(@InjectModel('Playlist') private readonly playlistModel: Model<Playlist>) { }

    async create(data: CreatePlaylistDto): Promise<Playlist> {
        const newPlaylist = new this.playlistModel(data);
        return newPlaylist.save();
    }

    async findAll(): Promise<Playlist[]> {
        return this.playlistModel.find().populate('tracks').exec();
    }

    async findById(id: string): Promise<Playlist> {
        const playlist = await this.playlistModel.findById(id).populate('tracks').exec();
        if (!playlist) {
            throw new NotFoundException(`Playlist with ID ${id} not found`);
        }
        return playlist;
    }

    async update(id: string, data: UpdatePlaylistDto): Promise<Playlist> {
        const updatedPlaylist = await this.playlistModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedPlaylist) {
            throw new NotFoundException(`Playlist with ID ${id} not found`);
        }
        return updatedPlaylist;
    }

    async delete(id: string): Promise<Playlist> {
        const deletedPlaylist = await this.playlistModel.findByIdAndDelete(id).exec();
        if (!deletedPlaylist) {
            throw new NotFoundException(`Playlist with ID ${id} not found`);
        }
        return deletedPlaylist;
    }

    async addTrackToPlaylist(playlistId: string, trackId: string): Promise<Playlist> {
        const playlist = await this.playlistModel.findById(playlistId).exec();
        if (!playlist) {
            throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
        }
        playlist.tracks.push(new Types.ObjectId(trackId));
        return playlist.save();
    }
}