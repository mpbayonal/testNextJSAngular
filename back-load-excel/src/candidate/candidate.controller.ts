import { Body, Controller, Post, Res } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Candidate } from './candidate.interface';

@Controller('candidate')
export class CandidateController {
  constructor(private candidateService: CandidateService) {}
  @Post('load')
  async updateProfilePic(@Res() res, @Body() body) {
    return this.candidateService.create(res, body);
  }
}
