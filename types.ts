
export enum ReportStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved'
}

export interface CommunityReport {
  id: string;
  category: string;
  description: string;
  location: string;
  timestamp: number;
  status: ReportStatus;
  imageUrl?: string;
}

export interface PublicService {
  id: string;
  name: string;
  type: 'Clinic' | 'School' | 'Police' | 'Library';
  location: string;
  hours: string;
  services: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  votes: { [option: string]: number };
}
