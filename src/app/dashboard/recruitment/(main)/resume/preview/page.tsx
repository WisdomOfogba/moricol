import React from "react";
import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { ProgressBar } from "../../../_components/progress-bar";
import resumeApi from "@/api/local-resume";
import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { UserResumeResponse, UserDetails } from "@/definition";





 async function getResume() {
  const session = await getUserSession();
  if (!session || !session.user || !('id' in session.user)) {
    throw new Error('User session is invalid or user ID is missing');
  }
  try {
    const resume  = await resumeApi.retrieveResume({ userId: session.user.id as string });
    
    return {...resume, user: session.user};
  } catch (error) {
    
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}


 async function PreviewResume() {
  const {data, user} : {data: UserResumeResponse, user: UserDetails} = await getResume();
  

  return (
    <div className="p-0 py-5 md:px-4">
      <ProgressBar progress={10} />
      {!data &&   <div>
        <h2 className="mb-4 text-2xl text-secondary-500 font-bold">NO RESUME FOUND!</h2>
        <div className="flex w-full justify-end gap-4 md:gap-8">
          <div className="space-x-4">
            <Link href={routes.RECRUITMENTRESUME} className="rounded bg-yellow-500 px-4 py-3 font-bold text-white hover:bg-yellow-600">
              CREATE ONE NOW
            </Link>
           
          </div>
        </div>
        </div>
        }
    {data&&  <div className="">
        <h2 className="mb-4 text-2xl font-bold">Preview Resume</h2>
        <div className="flex w-full justify-end gap-4 md:gap-8">
          <div className="space-x-4">
            <button className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
              PUBLISH NOW
            </button>
            <Link href={routes.RECRUITMENTRESUME} className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
              EDIT RESUME
            </Link>
          </div>
        </div>

        <div className="mt-5 bg-gray-50 px-5 py-5">
          <div className="mb-6 flex items-start rounded-lg bg-white p-2 shadow">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt={user.firstname}
              className="mr-4 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.firstname} {user.lastname}</h1>
              <p className="text-gray-600" 
              style={{
                wordBreak: 'break-word'
              }}
              >
                {data.bio}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
            <div className="">
              <Section title="EXPERIENCE" editable={true} editLink={routes.RECRUITMENT_WORK_EXPERIENCE}>
               
                {data.work_experience.map((exp)=>(
                <ExperienceItem
                key={exp._id}
                  title={exp.title}
                  date={exp.start_date + ' - ' + (exp.end_date === ''?'Present':exp.end_date)}
                  description={''}
                /> 
                ))}

                {data.work_experience.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <p className="text-lg text-secondary-500">No work experience added yet</p>
                    <Link href={routes.RECRUITMENT_WORK_EXPERIENCE} className=" hover:underline">Click edit/here to add your work experience</Link>
                  </div>
                )}
               
              </Section>
              <Section title="CERTIFICATION" editable={true} editLink={routes.RECRUITMENT_CERTIFICATIONS}>
                {data.certification.map((cert)=>(
                <CertificationItem
                key={cert._id}
                    title="Udemy"
                    subtitle="Introduction to Nursing"
                    date="2015 - 2019"
                  />
                ))}
                
                 {data.certification.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <p className="text-lg text-secondary-500">No certifications added yet</p>
                    <Link href={routes.RECRUITMENT_CERTIFICATIONS} className=" hover:underline">Click edit/here to add certifications</Link>
                  </div>
                )}
              </Section>
            </div>

            <div className="">
              <Section title="PORTFOLIO & CONTACT" editable={true} editLink={routes.RECRUITMENT_CONTACT}>
                <ContactItem icon="📧" text="devowhite@gmail.com" />
                <ContactItem icon="🔗" text="Portfolio/Social" />
                <ContactItem icon="🔗" text="Social" />
                <ContactItem icon="🔗" text="Portfolio" />
                <ContactItem icon="📞" text="+234 (0) 8173397806" />
              </Section>
              <Section title="SKILLS" editable={true} editLink={routes.RECRUITMENT_OTHERS}>
                <SkillItem text="Product design (Figma)" />
                <SkillItem text="Branding (Illustrator & Photoshop)" />
                <SkillItem text="Illustrations (Adobe Illustrator)" />
                <SkillItem text="Proper Presentation" />
                <SkillItem text="Leadership & Product Management" />
              </Section>
              <Section title="EDUCATION" editable={true} editLink={routes.RECRUITMENT_EDUCATION}>
                <EducationItem
                  degree="B.Sc in Computer Science (3.9 CGPA)"
                  school="National Open University of Nigeria"
                  date="2015 - 2019"
                />
              </Section>
              <Section title="LANGUAGE" editable={true} editLink={routes.RECRUITMENT_OTHERS}>
                <LanguageItem text="Product Design" />
                <LanguageItem text="Logo Design: From..." />
              </Section>
              <Section title="HOBBIES" editable={true} editLink={routes.RECRUITMENT_OTHERS}>
                <HobbyItem text="Reading" />
                <HobbyItem text="Swimming" />
              </Section>
              <Section title="REFERENCE" editable={true} editLink={routes.RECRUITMENT_REF}>
                <ReferenceItem
                  name="Mr. John Akpa"
                  email="johnakpa@gmail.com"
                  phone="08165748911"
                />
              </Section>
            </div>
          </div>
          <Section title="COVER LETTER" editable={true} editLink={routes.RECRUITMENT_COVER_LETTER}>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Ipsum rutrum enim aliquam
              molestie libero. Praesent neque nulla sapien urna viverra bibendum
              ac nisi enim. Neque dolor urna integer ultricies moncus sit
              tristique. Vel risus fringilla venenatis mattis et purus. Amet
              cras quis dui mi. Gravida dictum lobortis vitae ac non. Eu turpis
              quam a amet sollicitudin elit velit at laoreet. Nibh egestas
              semper egestas commodo pulvinar. Ipsum elit nunc habitant
              fringilla morbi nec facilisis. Massa ipsum imperdiet enim gravida
              dignissim senean pellentesque sagittis. Neque fringilla fringilla
              venenatis quam sit orci quam. Donec diam elit nunc habitant
              fringilla lectus odio commodo. Faucibus volutpat eget nunc elit
              at. Nam velit adipiscing vitae quam elementum lorem non. Eu
              molestie lorem feugiat aliquam. Sed faucibus laoreet blandit
              lectus et suspendisse. At tristique.
            </p>
          </Section>
          <Section title="CV" editable={true} editLink={routes.RECRUITMENT_CV}>
            <div className="rounded bg-red-100 p-4">CV</div>
          </Section>
        </div>
      </div>}
    </div>
  );
}

export default PreviewResume;




interface SectionProps {
  title: string;
  children: React.ReactNode;
  editable?: boolean;
  editLink?: string;
}

function Section({ title, children, editable = false, editLink }: SectionProps) {
  return (
    <div className="mb-6 rounded-lg bg-white p-2">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {editable && (
          <div className="flex space-x-2">
            <Link href={editLink??'null'} className="cursor-pointer">
              <BiPencil className="h-6 w-6 text-yellow-500" />
            </Link>
            <BsTrash2 className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

interface ExperienceItemProps {
  title: string;
  date: string;
  description: string;
}

function ExperienceItem({ title, date, description }: ExperienceItemProps) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{date}</p>
      <p className="mt-1 text-gray-600">{description}</p>
    </div>
  );
}

interface CertificationItemProps {
  title: string;
  subtitle: string;
  date: string;
}

function CertificationItem({ title, subtitle, date }: CertificationItemProps) {
  return (
    <div className="mb-2">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-600">{subtitle}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
}

function ContactItem({ icon, text }: ContactItemProps) {
  return (
    <div className="mb-2 flex items-center">
      <span className="mr-2">{icon}</span>
      <span className="text-gray-600">{text}</span>
    </div>
  );
}

interface SkillItemProps {
  text: string;
}

function SkillItem({ text }: SkillItemProps) {
  return (
    <div className="mb-2">
      <div className="h-2 w-full rounded bg-yellow-500"></div>
      <p className="mt-1 text-gray-600">{text}</p>
    </div>
  );
}

interface EducationItemProps {
  degree: string;
  school: string;
  date: string;
}

function EducationItem({ degree, school, date }: EducationItemProps) {
  return (
    <div className="mb-2">
      <h3 className="font-semibold">{degree}</h3>
      <p className="text-gray-600">{school}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  );
}

interface LanguageItemProps {
  text: string;
}

function LanguageItem({ text }: LanguageItemProps) {
  return (
    <div className="mb-2 mr-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-gray-700">
      {text}
    </div>
  );
}

interface HobbyItemProps {
  text: string;
}

function HobbyItem({ text }: HobbyItemProps) {
  return (
    <div className="mb-2 mr-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-gray-700">
      {text}
    </div>
  );
}

interface ReferenceItemProps {
  name: string;
  email: string;
  phone: string;
}

function ReferenceItem({ name, email, phone }: ReferenceItemProps) {
  return (
    <div>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-gray-600">{email}</p>
      <p className="text-gray-600">{phone}</p>
    </div>
  );
}
