import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangePickerInput() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const calendarRef = useRef(null);

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      calendarRef.current &&
      !(calendarRef.current as any).contains(e.target)
    ) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative pr-22">
      {/* Trigger */}
      <div
        onClick={toggleCalendar}
        className="flex items-center gap-2 px-4 py-2 border rounded-md shadow-sm bg-white cursor-pointer hover:shadow-md transition-all text-sm"
      >
        <CalendarDays className="w-4 h-4 text-[#34cf6c]" />
        <span>
          {format(dateRange[0].startDate, "dd/MM/yyyy")} -{" "}
          {format(dateRange[0].endDate, "dd/MM/yyyy")}
        </span>
      </div>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute z-50 mt-2 bg-white rounded-lg shadow-lg border"
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={["#34cf6c"]}
            showDateDisplay={false}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
