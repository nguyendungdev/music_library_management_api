import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { CommonDescription } from 'src/common/constants/descriptions.constants';
import { ErrorResponse } from 'src/common/dto/response.dto';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Get()
    @ApiOperation({ summary: 'Search for tracks and playlists' })
    @ApiOkResponse({
        description: CommonDescription.UPDATE_ITEM_SUCESS,
    })
    @ApiBadRequestResponse({
        description: CommonDescription.BAD_REQUEST,
        type: ErrorResponse,
    })
    @ApiInternalServerErrorResponse({
        description: CommonDescription.INTERNAL_SERVER_ERROR,
        type: ErrorResponse,
    })
    async search(@Query('query') query: string) {
        try {
            return await this.searchService.search(query);
        } catch (error) {
            throw new Error('Failed to search: ' + error.message);
        }
    }
}