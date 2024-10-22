import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('candidate')
export class CandidateController {
  constructor(private candidateService: CandidateService) {}
  @Post('load')
  @UseInterceptors(FileInterceptor('file'))
  async updateProfilePic(
    @Res() res,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.candidateService.create(res, body, file);
  }
}
