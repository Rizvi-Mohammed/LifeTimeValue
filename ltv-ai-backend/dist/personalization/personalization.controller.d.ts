import { PersonalizationService } from './personalization.service';
export declare class PersonalizationController {
    private readonly personalizationService;
    constructor(personalizationService: PersonalizationService);
    generateEmail(userProfile: any): Promise<any>;
}
