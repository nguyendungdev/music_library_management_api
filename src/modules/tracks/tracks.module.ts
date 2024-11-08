import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './schemas/track.schema';
import { TrackRepository } from './tracks.repository';
import { FileUploadService } from '../file-upload/file-upload.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }])],
  providers: [TracksService, TrackRepository, FileUploadService],
  controllers: [TracksController],
  exports: [TracksService]
})
export class TracksModule { }
