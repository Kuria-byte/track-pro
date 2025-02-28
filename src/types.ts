export interface ScopeItem {
  id: string;
  text: string;
  completed: boolean;
  month: number;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  price: number;
  mandatory: boolean;
  selected: boolean;
  recurring?: boolean;
}

export interface Milestone {
  id: string;
  name: string;
  status: 'Pending' | 'In Progress' | 'Complete';
}

export interface Document {
  id: string;
  name: string;
  type: 'upload' | 'download';
  url: string;
  date: string;
}

export interface Note {
  id: string;
  type: string;
  content: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  portfolioUrl: string;
}

export type Currency = 'USD' | 'KES' | 'GHS';

export type DemoStatus = 'online' | 'offline';

export interface UserData {
  name: string;
  accessCode: string;
  currentPhase: string;
  selectedCurrency: Currency;
  scopeItems: ScopeItem[];
  features: Feature[];
  milestones: Milestone[];
  documents: Document[];
  notes: Note[];
  demoStatus: DemoStatus;
}