import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { useState } from "react";

const TaskItemCalendar = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-4">
          <ClockIcon
            className={cn("ml-auto h-4 w-4", date && "text-primary-100")}
          />
          <Button
            variant={"outline"}
            className={cn(
              "w-fit gap-8 text-left font-normal h-fit border-primary-500 text-primary-500",
              !date && "text-muted-foreground"
            )}
          >
            {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
            <CalendarIcon className={cn("ml-auto h-4 w-4")} />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default TaskItemCalendar;
