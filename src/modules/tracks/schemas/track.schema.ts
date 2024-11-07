// src/schemas/track.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Track extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    artist: string;

    @Prop()
    album: string;

    @Prop()
    genre: string;

    @Prop()
    releaseYear: number;

    @Prop()
    duration: number;

    @Prop()
    mp3File: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);