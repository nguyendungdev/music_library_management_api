// src/services/playlists.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist } from './schemas/playlist.schema';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
    constructor(@InjectModel(Playlist.name) private playlistModel: Model<Playlist>) { }

    async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
        const createdPlaylist = new this.playlistModel(createPlaylistDto);
        return createdPlaylist.save();
    }

    async findAll(): Promise<Playlist[]> {
        return this.playlistModel.find().populate('tracks').exec();
    }

    async findOne(id: string): Promise<Playlist> {
        const playlist = await this.playlistModel.findById(id).populate('tracks').exec();
        if (!playlist) {
            throw new NotFoundException(`Playlist with ID ${id} not found`);
        }
        return playlist;
    }

    async update(id: string, updatePlaylistDto: CreatePlaylistDto): Promise<Playlist> {
        const updatedPlaylist = await this.playlistModel.findByIdAndUpdate(id, updatePlaylistDto, { new: true }).exec();
        if (!updatedPlaylist) {
            throw new NotFoundException(`Playlist with ID ${id} not found`);
        }
        return updatedPlaylist;
    }

    async remove(id: string): Promise<void> {
        const result = await this.playlistModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Playlist with ID ${id} not found`);
        }
    }
}