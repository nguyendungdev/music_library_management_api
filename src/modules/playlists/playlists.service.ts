// src/playlists.service.ts
import { Injectable } from '@nestjs/common';
import { PlaylistRepository } from './playlists.repository';
import { Playlist } from './schemas/playlist.schema';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class PlaylistsService {
    constructor(
        private playlistRepository: PlaylistRepository,
        private fileUploadService: FileUploadService,
    ) { }

    async create(data: CreatePlaylistDto, file?: Express.Multer.File): Promise<Playlist> {
        if (file) {
            const fileUrl = await this.fileUploadService.uploadFile(file.path, file.filename);
            data.albumCover = fileUrl;
        }
        return this.playlistRepository.create(data);
    }

    async findAll(): Promise<Playlist[]> {
        return this.playlistRepository.findAll();
    }

    async findById(id: string): Promise<Playlist> {
        return this.playlistRepository.findById(id);
    }

    async update(id: string, data: UpdatePlaylistDto, file?: Express.Multer.File): Promise<Playlist> {
        if (file) {
            const fileUrl = await this.fileUploadService.uploadFile(file.path, file.filename);
            data.albumCover = fileUrl;
        }
        return this.playlistRepository.update(id, data);
    }

    async delete(id: string): Promise<Playlist> {
        return this.playlistRepository.delete(id);
    }

    async addTrackToPlaylist(playlistId: string, trackId: string): Promise<Playlist> {
        return this.playlistRepository.addTrackToPlaylist(playlistId, trackId);
    }
}