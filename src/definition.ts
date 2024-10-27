type DrugList = string[];
type SubSubCategory = Record<string, DrugList>;
type SubCategory = Record<string, SubSubCategory>;
export type Category = Record<string, SubCategory>;

export type LoanItem = {
  SvgComponent: React.ComponentType<{ fill?: string }>;
  details: string;
};

export interface SectionTemplateProps {
  title: string;
  description: string;
  feature: {
    id: number;
    title: string;
    description: string;
  }[];
  img: {
    imgURL: string;
    altText: string;
  };
}

export interface DashboardAsideLinksProps {
  name: string;
  link: string;
  SVGComponent: React.ComponentType<{ fill?: string }>;
}

export interface SummaryCardProps {
  color: string;
  icon: React.ReactNode;
  total: number;
  title: string;
}

export interface LoanHistoryItem {
  title: string;
  description: string;
  status: string;
}


export type UserDetails = {
  auth: Record<string, unknown>;
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  gender: string;
  religion: string;
  occupation: string;
  maritalstatus: string;
  country: string;
  status: string;
  state: string;
  language: string;
  user_blocked: boolean;
  createdAt: string;
  __v: number;
};

export type LoginResponse = {
  status_code: number;
  status: boolean;
  message: string;
  data: {
    token: string;
    userDetails: UserDetails;
  };
};



export type UserResumeResponse = {
  reference: { name: string; email: string; phone: string };
  contact_details: { name: string; phone: string; socials: { option: string; optionUrl: string }[] };
  upload: { cv: string; picture: string };
  others: { skills: string[]; languages: string[]; hobby: string[]; notice_period: string };
  job_preference: { job_function: string[]; job_location: string[]; salary_range: string };
  _id: string;
  userid: string;
  bio: string;
  grade: string;
  work_experience: {
    _id: string;
    title: string;
    company: string;
    start_date: string;
    end_date: string;
    previous_employer: string;
    leaving_reason: string;
    inview: boolean;
  }[];
  education: Education[];
  certification: Certification[];
  createdAt: string;
  coverletter: string;
  __v: number;
}


export type Education = {
  _id: string;
  school: string;
  degree: string;
  start_date: string;
  end_date: string;
  course_description: string;
  what_you_learnt: string;
  inview: boolean;
};


export type ResumeType = 'local' | 'foreign'


export type Certification = {
  _id: string;
  training_type: string;
  course_learnt: string;
  start_date: string;
  end_date: string;
  course_description: string;
  grade: string;
  inview: boolean;
};