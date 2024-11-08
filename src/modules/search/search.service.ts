import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track } from '../tracks/schemas/track.schema';
import { Playlist } from '../playlists/schemas/playlist.schema';

@Injectable()
export class SearchService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<Track>,
        @InjectModel(Playlist.name) private playlistModel: Model<Playlist>,
    ) { }

    async search(query: string): Promise<{ tracks: Track[]; playlists: Playlist[] }> {
        const tracks = await this.trackModel.find({
            $text: { $search: query }
        }).exec();

        const playlists = await this.playlistModel.find({
            $text: { $search: query }
        }).populate('tracks').exec();

        const fuzzyTracks = await this.trackModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { artist: { $regex: query, $options: 'i' } },
                { album: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } },
            ],
        }).exec();

        const fuzzyPlaylists = await this.playlistModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { 'tracks.title': { $regex: query, $options: 'i' } },
                { 'tracks.artist': { $regex: query, $options: 'i' } },
                { 'tracks.album': { $regex: query, $options: 'i' } },
                { 'tracks.genre': { $regex: query, $options: 'i' } },
            ],
        }).populate('tracks').exec();

        const combinedTracks = [...new Set([...tracks, ...fuzzyTracks])];
        const combinedPlaylists = [...new Set([...playlists, ...fuzzyPlaylists])];

        return { tracks: combinedTracks, playlists: combinedPlaylists };
    }
}