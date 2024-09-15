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
