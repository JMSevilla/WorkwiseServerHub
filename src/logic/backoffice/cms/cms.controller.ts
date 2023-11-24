import { Body, Controller, Get, Post } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CmsDto } from './dto/cms.dto';

@Controller('api/v1/cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Post('initialized-cms')
  async _initializedCms(@Body() body: CmsDto){
    const result = await this.cmsService.initializedCms(body)
    return result;
  }
  @Get('get-all-cms')
  async getAllCms(){
    const result = await this.cmsService.getCms()
    return result;
  }
}
