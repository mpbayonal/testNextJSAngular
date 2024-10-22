import { Injectable, Body, Res, UploadedFile } from '@nestjs/common';
import { AppResponseDto, Candidate } from './candidate.interface';
import * as XLSX from 'xlsx';

@Injectable()
export class CandidateService {
  private readonly cats: Candidate[] = [];

  async create(
    @Res() res,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Candidate> {
    try {
      if (!file?.originalname?.match(/\.(xls|xlsx)$/)) {
        res.send(new AppResponseDto(400, {}, 'Invalid file format'));
        return;
      } // access files
      const nameValue = body?.name;
      const surnameValue = body?.surname; // // other fields
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(body);
      const candidate: Candidate = {
        name: nameValue,
        surname: surnameValue,
        seniority: data[0]['Seniority'],
        years: data[0]['Years of experience'],
        availability: data[0]['Availability'],
      };
      if (
        candidate.availability === undefined ||
        candidate.name === undefined ||
        candidate.surname === undefined ||
        candidate.seniority === undefined ||
        candidate.years === undefined
      ) {
        res.send(new AppResponseDto(400, {}, 'Missing fields in the file'));
        return;
      }
      res.send(new AppResponseDto(200, candidate));
    } catch (e) {
      // error handling}

      res.send(new AppResponseDto(500, {}, e.message));

      return;
      // Uploading finished
    }
  }
}
