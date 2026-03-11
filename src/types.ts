export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Founder' | 'Mentor' | 'Investor';
}

export interface Venture {
  id: number;
  userId: number;
  name: string;
  description: string;
  status: string;
}

export interface Canvas {
  id: number;
  ventureId: number;
  problem: string;
  solution: string;
  targetUsers: string;
  uvp: string;
  marketSize: string;
  traction: string;
  revenueModel: string;
  costStructure: string;
  competition: string;
  foundingTeam: string;
  advisors: string;
  ask: string;
  updatedAt: string;
}

export interface Milestone {
  id: number;
  ventureId: number;
  title: string;
  description: string;
  date: string;
  evidenceLink: string;
  status: string;
}

export interface DataRoomFile {
  id: number;
  ventureId: number;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadedAt: string;
}
