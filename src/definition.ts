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
