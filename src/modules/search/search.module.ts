import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackSchema } from '../tracks/schemas/track.schema';
import { PlaylistSchema } from '../playlists/schemas/playlist.schema';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Track', schema: TrackSchema }]),
        MongooseModule.forFeature([{ name: 'Playlist', schema: PlaylistSchema }]),
    ],
    providers: [SearchService],
    controllers: [SearchController],
})
export class SearchModule { }