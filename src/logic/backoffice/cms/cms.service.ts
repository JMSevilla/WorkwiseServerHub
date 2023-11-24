import { Injectable } from '@nestjs/common';
import { ICmsService } from 'src/logic/interfaces/ICmsService';
import { CmsDto } from './dto/cms.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cms } from './entities/cms.entity';
import { Repository } from 'typeorm';
import { useResponse } from 'src/utils/hook/useCreateResponse';

@Injectable()
export class CmsService implements ICmsService {
    constructor(@InjectRepository(Cms) private readonly cmsRepository: Repository<Cms>){}
    async getCms() {
        const list: Cms[] = await this.cmsRepository.find()
        return list;
    }
    async initializedCms(cmsDto: CmsDto) {
        const { 
            path,
            contentKey,
            access,
            hasLoading,
            isAccountSetup
        } = cmsDto
        const cms = new Cms()
        const result = await this.cmsRepository.findOne({ where: { path }})
        if(result) {
            return useResponse().createResponse({ message: 'exist'}, 201)
        } else {
            cms.contentKey = contentKey;
            cms.path = path;
            cms.access = access;
            cms.hasLoading = hasLoading;
            cms.isAccountSetup = isAccountSetup;
            await this.cmsRepository.save(cms);
            return useResponse().createResponse({ message: 'success'}, 200)
        }
    }

}
