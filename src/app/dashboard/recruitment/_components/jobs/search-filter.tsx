import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { BiFilter, BiSearch } from "react-icons/bi";
import FilterDrawer from "./filter-drawer";
import { Filters } from "./all-jobs-client";

interface SearchAndFilterProps {
  setShowFilters: (t: boolean) => void;
  toggleFilter: (category: keyof Filters, value: string) => void;
  showFilters: boolean;
  filters: Filters;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  setShowFilters,
  toggleFilter,
  filters,
  showFilters,
}) => {
  return (
    <div className="mb-4 flex flex-col space-y-2 rounded bg-white p-2 shadow lg:mb-6 lg:flex-row lg:space-x-4 lg:space-y-0">
      <div className="flex flex-1 items-center rounded-lg">
        <div className="relative flex-1">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Job Title"
            className="w-full rounded-lg py-2 pl-10 pr-3 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-1 items-center rounded-lg">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="abuja">Abuja, Nigeria</SelectItem>
            <SelectItem value="lagos">Lagos, Nigeria</SelectItem>
            <SelectItem value="port-harcourt">
              Port Harcourt, Nigeria
            </SelectItem>
          </SelectContent>
        </Select>
        <button
          className="ml-2 flex h-[36px] items-center justify-center rounded p-4 text-primary-500 transition duration-300 hover:bg-gray-200"
          onClick={() => setShowFilters(true)}
        >
          <BiFilter size={24} />
        </button>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 rounded-lg bg-yellow-500 px-4 py-3 text-white transition duration-300 hover:bg-yellow-600 md:flex-none">
          FOREIGN JOB ROLE
        </button>
        <button className="flex-1 rounded-lg bg-yellow-500 px-4 py-3 text-white transition duration-300 hover:bg-yellow-600 md:flex-none">
          POST A JOB
        </button>
      </div>
      <FilterDrawer
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        toggleFilter={toggleFilter}
      />
    </div>
  );
};

export default SearchAndFilter;
