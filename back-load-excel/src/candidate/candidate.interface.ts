export interface Candidate {
  name: string;
  surname: string;
  years: number;
  availability: boolean;
  seniority: string;
}

export class AppResponseDto {
  constructor(
    public statusCode: number,
    public data: any = undefined,
    public message: string = 'Success',
  ) {}
}
