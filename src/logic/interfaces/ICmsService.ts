import { CmsDto } from "../backoffice/cms/dto/cms.dto";
import { Cms } from "../backoffice/cms/entities/cms.entity";

export interface ICmsService {
    initializedCms(cmsDto: CmsDto)
    getCms()
}