import Button from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import { useState } from "react";
import { BiX } from "react-icons/bi";

const FilterModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState<'' | 'ongoing' | 'past' | 'upcoming'>("ongoing");
  const router = useRouter();

  const applyFilter = () => {
    router.replace(`${routes.TELEMEDICINE_APPOINTMENTS}?date=${date}&startTime=${startTime}&endTime=${endTime}&status=${status === "ongoing" ? "" : status}`);
  };
  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${show ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
    >
      <div
        className={`m-auto relative w-[90%] max-w-[600px] transform rounded-lg bg-white shadow-lg transition-transform ${show ? "scale-100" : "scale-95"
          }`}
      >
        <Card className="">
          <CardContent className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">FILTER</h3>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-fit p-1 hover:bg-red-500 hover:text-white"
              >
                <BiX className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block">Date</label>
                <Input
                  type="date"
                  placeholder="Select Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full block"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block">Start Time</label>
                  <Input
                    type="time"
                    placeholder="Start Time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full block"
                  />
                </div>
                <div>
                  <label className="mb-2 block">End Time</label>
                  <Input
                    type="time"
                    placeholder="End Time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full block"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block">Status</label>
                <Select value={status} onValueChange={(value: "ongoing" | "past" | "upcoming") => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="z-[70]">
                    <SelectItem value="ongoing" className="hover:bg-primary-100 cursor-pointer">Ongoing</SelectItem>
                    <SelectItem value="past" className="hover:bg-primary-100 cursor-pointer">Past</SelectItem>
                    <SelectItem value="upcoming" className="hover:bg-primary-100 cursor-pointer">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full bg-primary-500 text-white hover:bg-primary-600"
                onClick={applyFilter}
              >
                Apply Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FilterModal;
