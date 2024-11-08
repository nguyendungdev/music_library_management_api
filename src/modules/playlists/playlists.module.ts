import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistRepository } from './playlists.repository';
import { FileUploadService } from '../file-upload/file-upload.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, PlaylistRepository, FileUploadService]
})
export class PlaylistsModule { }
