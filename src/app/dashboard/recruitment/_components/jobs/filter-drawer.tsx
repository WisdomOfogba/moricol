import { Label } from "@radix-ui/react-label";
import { Filters } from "./all-jobs-client";
import { BiX } from "react-icons/bi";

interface FilterDrawerProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filters: Filters;
  toggleFilter: (category: keyof Filters, value: string) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  showFilters,
  setShowFilters,
  filters,
  toggleFilter,
}) => {
  if (!showFilters) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute bottom-0 right-0 top-0 w-full overflow-y-auto bg-white p-4 md:w-80">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={() => setShowFilters(false)}>
            <BiX size={24} />
          </button>
        </div>
        <div className="mb-4">
          <Label className="mb-2 font-medium">Job Type</Label>
          {[
            "Full Time Jobs",
            "Part Time Jobs",
            "Remote Jobs",
            "Internship Jobs",
            "Contract",
            "Training Jobs",
          ].map((type) => (
            <label key={type} className="mb-2 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.jobType.includes(type)}
                onChange={() => toggleFilter("jobType", type)}
              />
              {type}
            </label>
          ))}
        </div>
        <div className="mb-4">
          <Label className="mb-2 font-medium">Job Level</Label>
          {[
            "Low Level Manager",
            "Mid Level Manager",
            "Top Level Manager",
            "Senior Level",
            "Directors",
            "VIP or Above",
          ].map((level) => (
            <label key={level} className="mb-2 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.jobLevel.includes(level)}
                onChange={() => toggleFilter("jobLevel", level)}
              />
              {level}
            </label>
          ))}
        </div>
        <div>
          <Label className="mb-2 font-medium">Salary Range</Label>
          {[
            "N10k - N50k",
            "N100k - N200k",
            "N200k - N500k",
            "N500k - N1million",
            "N1million - N2million",
            "N2million and above",
          ].map((range) => (
            <label key={range} className="mb-2 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.salaryRange.includes(range)}
                onChange={() => toggleFilter("salaryRange", range)}
              />
              {range}
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            className="rounded-lg bg-yellow-500 px-4 py-2 text-white transition duration-300 hover:bg-yellow-600"
            onClick={() => setShowFilters(false)}
          >
            Done
          </button>
          <button className="text-yellow-500 hover:underline">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
