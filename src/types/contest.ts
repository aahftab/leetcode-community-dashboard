export interface Contest {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

export interface ContestResult {
  rank: number;
  contestantName: string;
  questionsCompleted: number;
} 