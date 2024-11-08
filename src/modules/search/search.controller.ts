// src/search.controller.ts
import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { Track } from '../tracks/schemas/track.schema';
import { Playlist } from '../playlists/schemas/playlist.schema';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Search for tracks and playlists' })
    @ApiQuery({ name: 'query', required: true, type: String })
    @ApiOkResponse({
        description: 'Search results',
        schema: {
            type: 'object',
            properties: {
                tracks: { type: 'array', items: { $ref: '#/components/schemas/Track' } },
                playlists: { type: 'array', items: { $ref: '#/components/schemas/Playlist' } },
            },
        },
    })
    async search(@Query('query') query: string): Promise<{ tracks: Track[]; playlists: Playlist[] }> {
        return this.searchService.search(query);
    }
}