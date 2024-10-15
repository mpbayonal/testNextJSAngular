import { Module } from '@nestjs/common';
import { CandidateController } from './candidate/candidate.controller';
import { CandidateService } from './candidate/candidate.service';

@Module({
  imports: [],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class AppModule {}
