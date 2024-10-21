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
