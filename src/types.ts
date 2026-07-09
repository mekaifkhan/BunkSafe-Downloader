export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to look up Lucide icons dynamically
}

export interface DeveloperInfo {
  name: string;
  college: string;
  degree: string;
  department: string;
  email: string;
  github: string;
}

export interface ReleaseNote {
  version: string;
  date: string;
  changes: string[];
}
