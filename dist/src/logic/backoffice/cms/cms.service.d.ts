import { ICmsService } from 'src/logic/interfaces/ICmsService';
import { CmsDto } from './dto/cms.dto';
import { Cms } from './entities/cms.entity';
import { Repository } from 'typeorm';
export declare class CmsService implements ICmsService {
    private readonly cmsRepository;
    constructor(cmsRepository: Repository<Cms>);
    getCms(): Promise<Cms[]>;
    initializedCms(cmsDto: CmsDto): Promise<{
        data: any;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
