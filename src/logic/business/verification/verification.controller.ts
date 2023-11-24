import { Controller } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller('api/v1/verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}
}
