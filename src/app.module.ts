import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './configs/configs.constant';
import { TracksModule } from './modules/tracks/tracks.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { SearchModule } from './modules/search/search.module';

console.log(databaseConfig.uri)
@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri),
    TracksModule,
    PlaylistsModule,
    FileUploadModule,
    SearchModule
  ],
})
export class AppModule { }
