import { CmsService } from './cms.service';
import { CmsDto } from './dto/cms.dto';
export declare class CmsController {
    private readonly cmsService;
    constructor(cmsService: CmsService);
    _initializedCms(body: CmsDto): Promise<{
        data: any;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    getAllCms(): Promise<import("./entities/cms.entity").Cms[]>;
}
