import { TermDto } from "./term.dto";

export interface ModuleDto {
  id: string;
  name: string;
  description: string;
  terms: TermDto[];
  numberOfTerms: number;
}
