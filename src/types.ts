interface ContactItem {
  type: "email | phone | location | website | linkedin | github | gitlab ";
  display: string;
  icon: string;
  link?: string;
}

interface Dates {
  start: string;
  end?: string; // undefined means present
}

interface Education {
  degree: string;
  institution: string;
  location: string;
  dates: Dates;
}

interface Job {
  title: string;
  company: string;
  location?: string;
  dates: Dates;
  bullets?: string[];
}

export interface SkillsCategory {
  category: string;
  useIcons?: boolean;
  items: string[];
}

export interface CvData {
  name: string;
  tagline?: string;
  contact: ContactItem[];
  summary?: string;
  education: Education[];
  experience: Job[];
  skills: SkillsCategory[];
}
