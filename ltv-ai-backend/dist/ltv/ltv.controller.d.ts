import { LtvService } from './ltv.service';
export declare class LtvController {
    private readonly ltvService;
    constructor(ltvService: LtvService);
    predictLtv(body: {
        customerData: string;
    }): Promise<any>;
}
