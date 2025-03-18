import { Controller, Post, Body } from '@nestjs/common';
import { PersonalizationService } from './personalization.service';

@Controller('api/personalize')
export class PersonalizationController {
    constructor(private readonly personalizationService: PersonalizationService) { }

    @Post('email')
    async generateEmail(@Body() userProfile: any) {
        return this.personalizationService.generatePersonalizedEmail(userProfile);
    }
}