interface ContactItem {
    display: string;
    icon: string;
    link?: string;
}

interface Contact {
    email: ContactItem;
    phone: ContactItem;
    location?: ContactItem;
    website?: ContactItem;
    linkedin?: ContactItem;
    github?: ContactItem;
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

interface SkillsCategory {
    category: string;
    items: string[];
}

export interface CvData {
  name: string;
  tagline?: string;
  contact: Contact;
  summary?: string;
  education: Education[];
  experience: Job[];
  skills: SkillsCategory[];
}
