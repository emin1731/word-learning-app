export interface TermDto {
  id: string;
  term: string;
  definition: string;
  isStarred: boolean;
  status: string;
}

export type LearningStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
