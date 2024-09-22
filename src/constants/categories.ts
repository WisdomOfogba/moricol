type DrugList = string[];
type SubSubCategory = Record<string, DrugList>;
type SubCategory = Record<string, SubSubCategory>;
type Category = Record<string, SubCategory>;

export const categories: Category = {
  medication: {
    analgestic: {
      "some drugs": ["finally"],
    },
  },
  consumables: {
    analgestic: {
      "some drugs": ["finally"],
    },
  },
  "beauty and cosmetics": {
    analgestic: {
      "some drugs": ["finally"],
    },
  },
  herbal: {
    analgestic: {
      "some drugs": ["finally"],
    },
  },
  "medical equipment/instruments": {
    analgestic: {
      "some drugs": ["finally"],
    },
  },
};
