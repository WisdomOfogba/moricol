import React from "react";
import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { ProgressBar } from "../../../_components/progress-bar";
import resumeApi from "@/api/local-resume";
import { getUserSession } from "@/lib/auth";



 async function getResume() {
  const session = await getUserSession();
  if (!session || !session.user || !('id' in session.user)) {
    throw new Error('User session is invalid or user ID is missing');
  }
  try {
    const resume = await resumeApi.retrieveResume({ userId: session.user.id as string });
    
    return resume;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}


 async function PreviewResume() {
  const resume = await getResume();
  console.log('resume', resume);

  return (
    <div className="p-0 py-5 md:px-4">
      <ProgressBar progress={10} />
      <div className="">
        <h2 className="mb-4 text-2xl font-bold">Preview Resume</h2>
        <div className="flex w-full justify-end gap-4 md:gap-8">
          <div className="space-x-4">
            <button className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
              PUBLISH NOW
            </button>
            <button className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
              EDIT RESUME
            </button>
          </div>
        </div>

        <div className="mt-5 bg-gray-50 px-5 py-5">
          <div className="mb-6 flex items-center rounded-lg bg-white p-2 shadow">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Mike George"
              className="mr-4 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">Mike George</h1>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Facilisis egestas senean
                est volutpat tristique nisi morbi amet dictum. Massa morbi eget
                et donec non risus ipsum vitae. Vitae integer mattis.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
            <div className="">
              <Section title="EXPERIENCE" editable>
                <ExperienceItem
                  title="Product Designer | Flpex, Nigeria"
                  date="September 2023 - Present"
                  description="Lorem ipsum dolor sit amet consectetur. Quam curabitor purus scelerisque ut mollis morbi vitae amet amet. Bibendum sapien odio sodales sed mattis nunc. Cursus at sapien."
                />
                <ExperienceItem
                  title="Product Designer | Chiva, Nigeria"
                  date="March 2023 - Present"
                  description="Lorem ipsum dolor sit amet consectetur. Rhoncus arcu tristique in morbi tellus nulla condimentum posuere. Nec in nunc viverra pretium ultrices. Libero massa congue magna."
                />
                <ExperienceItem
                  title="Product Designer | NFTNotif, Netherland"
                  date="February 2023 - Present"
                  description="Lorem ipsum dolor sit amet consectetur. Turpis odio odio ultricies amet risus commodo. Dictum ac tellus turpis ullamcorper cursus proin non. Orci purus purus urna tincidunt volutpat augue."
                />
                <ExperienceItem
                  title="Brand Designer | Debrend Travels, Nigeria"
                  date="December 2020 - March 2023"
                  description="Lorem ipsum dolor sit amet consectetur. Velit nam imperdiet laoreet tincidunt. Lacus gravida blandit mi dignissim aliquam quam consequat elit. At nec dictumst pharetra sagittis odio."
                />
              </Section>
              <Section title="CERTIFICATION" editable>
                <CertificationItem
                  title="Udemy"
                  subtitle="Introduction to Nursing"
                  date="2015 - 2019"
                />
                <CertificationItem
                  title="Cousera"
                  subtitle="Introduction to Nursing"
                  date="2015 - 2019"
                />
              </Section>
            </div>

            <div className="">
              <Section title="PORTFOLIO & CONTACT" editable>
                <ContactItem icon="📧" text="devowhite@gmail.com" />
                <ContactItem icon="🔗" text="Portfolio/Social" />
                <ContactItem icon="🔗" text="Social" />
                <ContactItem icon="🔗" text="Portfolio" />
                <ContactItem icon="📞" text="+234 (0) 8173397806" />
              </Section>
              <Section title="SKILLS" editable>
                <SkillItem text="Product design (Figma)" />
                <SkillItem text="Branding (Illustrator & Photoshop)" />
                <SkillItem text="Illustrations (Adobe Illustrator)" />
                <SkillItem text="Proper Presentation" />
                <SkillItem text="Leadership & Product Management" />
              </Section>
              <Section title="EDUCATION" editable>
                <EducationItem
                  degree="B.Sc in Computer Science (3.9 CGPA)"
                  school="National Open University of Nigeria"
                  date="2015 - 2019"
                />
              </Section>
              <Section title="LANGUAGE" editable>
                <LanguageItem text="Product Design" />
                <LanguageItem text="Logo Design: From..." />
              </Section>
              <Section title="HOBBIES" editable>
                <HobbyItem text="Reading" />
                <HobbyItem text="Swimming" />
              </Section>
              <Section title="REFERENCE" editable>
                <ReferenceItem
                  name="Mr. John Akpa"
                  email="johnakpa@gmail.com"
                  phone="08165748911"
                />
              </Section>
            </div>
          </div>
          <Section title="COVER LETTER" editable>
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
          <Section title="CV" editable>
            <div className="rounded bg-red-100 p-4">CV</div>
          </Section>
        </div>
      </div>
    </div>
  );
}

export default PreviewResume;




interface SectionProps {
  title: string;
  children: React.ReactNode;
  editable?: boolean;
}

function Section({ title, children, editable = false }: SectionProps) {
  return (
    <div className="mb-6 rounded-lg bg-white p-2">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {editable && (
          <div className="flex space-x-2">
            <BiPencil className="h-4 w-4 text-yellow-500" />
            <BsTrash2 className="h-4 w-4 text-red-500" />
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
