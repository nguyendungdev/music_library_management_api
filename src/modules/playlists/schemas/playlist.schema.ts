// src/schemas/playlist.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Track } from 'src/modules/tracks/schemas/track.schema';

@Schema()
export class Playlist extends Document {
    @Prop({ required: true })
    title: string;

    @Prop()
    albumCover: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Track' }] })
    tracks: Types.ObjectId[];

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);