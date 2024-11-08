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

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date }) //, default: Date.now 
    createdAt: Date;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
TrackSchema.index({ title: 'text', artist: 'text', album: 'text', genre: 'text' });
