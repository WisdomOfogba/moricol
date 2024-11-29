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
  contact_details: {
    name: string;
    phone: string;
    socials: { option: string; optionUrl: string }[];
  };
  upload: { cv: string; picture: string };
  others: {
    skills: string[];
    languages: string[];
    hobby: string[];
    notice_period: string;
  };
  job_preference: {
    job_function: string[];
    job_location: string[];
    salary_range: string;
  };
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
};

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

export type ResumeType = "local" | "foreign";

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

export interface JobPostResponse {
  _id: string;
  candidate_title: string;
  job_type: string;
  job_level: string;
  working_condition: string;
  state: string;
  max_salary: number;
  min_salary: number;
  min_experience: number;
  slot: number;
  country: string;
  description: string;
  gender: string[];
  marital_status: string[];
  religion: string[];
  start_date: string;
  end_date: string;
  company_logo: string;
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  company_bio: string;
  status: string;
  date_approved: string;
  job_acrhive: boolean;
  job_paid: boolean;
  job_publish: boolean;
  job_approved: boolean;
  moricol_job: boolean;
  price: number;
  applicants: number;
  academic_qualification: string[];
  requirement: string;
  userid: string;
  createdAt: string;
  __v: number;
}

export type FilterValues = {
  job_titles: string[];
  job_types: ("fulltime" | "parttime" | "contract")[];
  max_salaries: number[];
  min_salaries: number[];
  job_level: string[];
  state: string;
  [key: string]: string[] | number[] | string;
};

export type LoanCategory = {
  _id: string;
  name: string;
  image: string;
};

export type LoanDetails = {
  range: {
    amount1: number;
    amount2: number;
    amount3: number;
  };
  _id: string;
  name: string;
  image: string;
  durations: Array<{
    days: number;
    interest: number;
    late_interest: number;
    installment_days: {
      days: number;
      period: number;
      _id: string;
    }[];
    _id: string;
  }>;
  client: number;
  createdAt: string;
  __v: number;
};

export type Plan = {
  title: string;
  plan_type: string;
  min_members: number;
  max_members: number;
  subtitle: string;
  durations: { label: string; price: string }[];
  highlighted?: boolean;
};

export type Organization = {
  _id: string;
  userid: string;
  plan_type: string;
  duration: string;
  name: string;
  user_limit: number;
  amount: number;
  total_member: number;
  balance_amount: number;
  active: boolean;
  createdAt: string;
  __v: number;
};

export type OrganizationMember = {
  _id: string;
  userid: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };
  organizationid: {
    _id: string;
    name: string;
  };
  createdAt: string;
  __v: number;
};

export type LoanDataType = {
  _id: string;
  title: string;
  content: string;
  userid: string;
  loanoffer: string;
  createdAt: string;
  __v: number;
};

export interface Demographic {
  bloodgroup: string;
  genetype: string;
  reports: string[];
  allergy: string[];
}

export interface ProfileRequestType {
  userid: string;
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  maritalstatus: string;
  occupation: string;
  dob: string;
  religion: string;
  country: string;
  state: string;
  photo: string;
  language: string;
  demographic: Demographic;
}

export type ProfileData = {
  demographic: {
    bloodgroup: string;
    genotype: string;
    allergy: string[] | string;
    reports: string[];
    emergency_contact: string;
    emergency_name: string;
    kin_name: string;
    kin_relationship: string;
    kin_number: string;
  };
  mail_on: boolean;
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
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
  phone: string;
  photo: string;
};

export type TelemedicineCategoryData = {
  category: {
    editedBy: null | string;
    editedAt: string;
    _id: string;
    name: string;
    status: string;
    image: string;
    description: string;
    client: number;
    createdAt: string;
    __v: number;
  };
  subcategory: Array<{
    editedBy: null | string;
    editedAt: string;
    _id: string;
    name: string;
    price: number;
    category: string;
    createdAt: string;
    __v: number;
  }>;
};

export type AppointmentScheduleData = {
  time: {
    start: string;
    end: string;
  };
  _id: string;
  date: string;
  staffid: {
    _id: string;
    firstname: string;
    lastname: string;
    photo: string;
  } | null;
};

export type AppointmentStatus = "" | "ongoing" | "accepted" | "past";

export type SingleAppointmentData = {
  time: {
    start: string;
    end: string;
  };
  organization: {
    use_organization: boolean;
    organizationid: string | null;
  };
  user_notification: {
    sms: boolean;
    email: boolean;
    push: boolean;
  };
  staff_notification: {
    sms: boolean;
    email: boolean;
    push: boolean;
  };
  sessiontype: {
    chat: boolean;
    video: boolean;
    audio: boolean;
  };
  _id: string;
  date: string;
  feelingdays: number;
  takingmedication: boolean;
  user_responsiveness: boolean;
  session_close: boolean;
  urgent_type: string;
  state: string;
  country: string;
  drugallergy: boolean;
  surgery: boolean;
  medicalcondition: boolean;
  familymedicalcondition: boolean;
  booked: boolean;
  sessionover: boolean;
  sessiontaken: boolean;
  medication: Array<{
    days: number;
    drug: string;
    _id: string;
  }>;
  primarycomplain: string[];
  others: string[];
  total_amount: number;
  note: string;
  status: string;
  userupload: Array<{
    name: string;
    upload: string;
    _id: string;
  }>;
  staffupload: Array<{
    name: string;
    upload: string;
    _id: string;
  }>;
  userid: {
    _id: string;
    firstname: string;
    lastname: string;
    gender: 'male' | 'female';
    country: string;
    state: string;
    photo: string;
  };
  staffid: {
    _id: string;
    firstname: string;
    lastname: string;
    photo: string;
    age: string;
    gender: 'male' | 'female';
    state: string;
    country: string;
  }
  subcategoryid: string;
  paymentid: string;
  createdAt: string;
  __v: number;
};

export type CartData = {
  _id: string;
  title: string;
  price: number;
  coursetype: string;
  rating: number;
  thumbnail: string;
  instructors: {
    instructor: instructors;
    _id: string;
  }[];
};

export type CourseData = {
  coursetype: string;
  _id: string;
  bundle: string;
  bundle_option: string;
  title: string;
  care_certificate: boolean;
  price: number;
  rating: number;
  level: number;
  thumbnail: string;
  add_on: string[];
  online_course: [
    {
      course: string;
      _id: string;
    },
  ];
  classroom_course: [
    {
      course: string;
      _id: string;
    },
  ];
  description: string;
  instructors: [
    {
      instructor: instructors;
      _id: string;
    },
  ];
  start_messagge: string;
  end_messagge: string;
  editedBy: string;
  editedAt: string;
  createdAt: string;
  __v: number;
  client: number;
  category: string;
  start_date: string;
  end_date: string;
  duration: string;
  duration_description: string;
  benefits: [
    {
      option: string;
      _id: string;
    },
  ];
  sections: [
    {
      option: string;
      _id: string;
    },
  ];
  for_who: [
    {
      option: string;
      _id: string;
    },
  ];
  redirect_course: { links: string[]; redirect: boolean };
  standalone: true;
  curriculum: curriculum[];
  requirement: string[];
  quantity: number;
};

export type curriculum = {
  section_name: string;
  section: section[];
  _id: string;
};

export type section = {
  lesson_name: string;
  _id: string;
  lesson_completed: boolean
  lesson: {
    lesson_type: string;
    content: string;
    isquiz: boolean;
    quiz: {
      mark: string;
      user_score: number;
      questions: [
        {
          question: string;
          options: [
            {
              optionText: string;
              isCorrect: boolean;
            },
            {
              optionText: string;
              isCorrect: boolean;
            },
          ];
        },
      ];
    };
  };
};

export type ReviewData = {
  _id: string;
  userid: {
    photo: string;
    _id: string;
    firstname: string;
    lastname: string;
  };
  courseid: string;
  courseType: string;
  review: string;
  rating: number;
  createdAt: string;
  __v: number;
};

export type OrderData = {
  _id: string;
  amount: number;
  progress: number;
  progress_count: number;
  course_completed: boolean;
  curriculum: curriculum[];
  userid: string;
  paystackref: string;
  courseid: string;
  coursetype: string;
  createdAt: string;
  __v: 0;
};

export type Dashboard = {
  completedcourses: number;
  activecourses: number;
  enroledcourses: number;
  courses: [
    {
      _id: string;
      progress: number;
      courseid: string;
    },
  ];
};

export type comment = {
  _id: string;
  userid: userid;
  courseid: string;
  reply: reply[];
  comment: string;
  createdAt: string;
  isAdmin: boolean;
};

export type userid = {
  _id: string;
  firstname: string;
  lastname: string;
  photo: string;
};

export type reply = {
  _id: string;
  userid: userid;
  courseid: string;
  reply: string;
  comment: string;
  createdAt: string;
  isAdmin: boolean;
};

export type SingleCourse = {
  comment: comment[];
  review: string[];
  course: {
    redirect_course: {
      links: string[];
      redirect: boolean;
    };
    _id: string;
    title: string;
    bundle: string;
    price: number;
    rating: number;
    thumbnail: string;
    description: string;
    duration: string;
    curriculum: curriculum[];
    instructors: [
      {
        instructor: string;
        _id: string;
      },
    ];
    requirement: [
      {
        option: string;
        _id: string;
      },
    ];
    for_who: [];
    benefits: [
      {
        option: string;
        _id: string;
      },
    ];
    coursetype: string;
    createdAt: string;
    __v: number;
    level: number;
  };
  courseorder: courseorder;
};

export type courseorder = {
  _id: string;
  amount: number;
  progress: number;
  coursetype: string;
  curriculum: curriculum[];
  userid: string;
  courseid: {
    _id: string;
    title: string;
    bundle: string;
    price: number;
    rating: number;
    thumbnail: string;
    description: string;
    duration: string;
    client: string;
    instructors: [
      {
        instructor: instructors;
        _id: string;
      },
    ];
    requirement: [
      {
        option: string;
        _id: string;
      },
    ];
    for_who: [];
    benefits: [
      {
        option: string;
        _id: string;
      },
    ];
    coursetype: string;
    createdAt: string;
    __v: number;
    level: number;
  };
};

export type instructors = {
  _id: string;
  name: string;
  photo: string;
};

export type archive = {
  _id: string;
  admin_details: {
    name: string;
    photo: string;
  };
};

export type messaging = {
  _id: string;
  message: string;
  sender: string;
  userid: string;
  adminid: string;
  createdAt: string;
  __v: number;
};

export type NotesData = {
  _id: string;
  title: string;
  comment: string;
  staffid: string;
  appointmentid: string;
  createdAt: string;
  __v: number;
};

export type MassageData = {
  _id: string;
  firstname: string;
  lastname: string;
  photo: string;
  massage_specialty: {
    _id: string;
    experience: number;
    massageid: string;
    massagetime: {
      end_time: string;
      start_time: string;
      _id: string;
    }[];
    rating: number;
    specialtyprice: number;
    totalreviews: number;
  }[];
};

export type MassageServiceData = {
  _id: string;
  name: string;
  image: string;
  description: string;
  functionality: string;
  price: number;
  client: number;
  createdAt: string;
  editedBy: string | null;
  editedAt: string;
  __v: number;
}

export type SingleMassageData = {
  _id: string;
  firstname: string;
  lastname: string;
  gender: string;
  staff_placement: {
    service: string;
    specialty: string | null;
    language: string;
    experience: number;
    price: number;
    bio: string;
    service_blocked: boolean;
    caregiver: boolean;
    serviceid: string;
    _id: string;
  }[];
  massage_specialty: {
    massageid: string;
    experience: number;
    rating: number;
    specialtyprice: number;
    totalreviews: number;
    massagetime: {
      end_time: string;
      start_time: string;
      _id: string;
    }[];
    _id: string;
  }[];
}


export type MessagePayload = {
  userid: string,
  appointmentid: string,
  usertype: 'user' | 'staff',
  text: string
};


export type CreateAppointmentPayload = {
  userid: string;
  massageid: string;
  staffid: string;
  paystackref: string;
  home_service: boolean;
  end_time: string;
  start_time: string;
  date: string;
  note: string;
  amount: number;
  extrafee: number;
  km: number;
  bvn: string;
  address: string;
  landmark: string;
  state: string;
};
