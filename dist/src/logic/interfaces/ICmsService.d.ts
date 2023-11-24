import { CmsDto } from "../backoffice/cms/dto/cms.dto";
export interface ICmsService {
    initializedCms(cmsDto: CmsDto): any;
    getCms(): any;
}
