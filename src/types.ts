export interface ServiceItem {
  name: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  servicesCount: number;
  items: ServiceItem[];
}

export interface IndustryItem {
  id: string;
  name: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  metrics: string;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  industry: string;
  problem: string;
  dataInput: string;
  technologyUsed: string[];
  workPerformed: string;
  finalDeliverables: string[];
  verifiedResults: string;
  accuracyGsd: string;
  rmseVertical: string;
  areaCovered: string;
  badge: string;
}

export interface InquiryRecord {
  id: string;
  referenceId: string;
  type: 'project' | 'partner';
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  projectLocation: string;
  requiredService: string;
  dataAvailability: 'existing_data' | 'requires_flight' | 'consultation';
  projectArea: string;
  expectedTimeline: string;
  partnerCategory?: string;
  additionalDetails: string;
  status: 'New' | 'Technical Assessment' | 'Scope Finalized' | 'In Progress' | 'Completed';
  createdAt: string;
}

export type LanguageMode = 'en' | 'hi';
