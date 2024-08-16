import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TTaskItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { FC, useState } from "react";

type Props = {
  data: TTaskItem;
  setDate: (data: TTaskItem) => void;
};

const TaskItemCalendar: FC<Props> = ({ data, setDate }) => {
  const formatTrueDate = (date: Date) => {
    const originalDateString = date.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    const originalDate = new Date(originalDateString);
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();

    originalDate.setHours(currentHours, currentMinutes, currentSeconds);
    const newDateString = originalDate.toLocaleString("en-US");

    return newDateString;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-4 pl-3">
          <ClockIcon
            className={cn("ml-auto h-4 w-4", data?.date && "text-primary-100")}
          />
          <Button
            variant={"outline"}
            className={cn(
              "w-fit gap-8 text-left font-normal h-fit border-primary-500 text-primary-500",
              !data.date && "text-muted-foreground"
            )}
          >
            {data.date ? (
              format(data.date, "dd/MM/yyyy")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className={cn("ml-auto h-4 w-4")} />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={data.date ? new Date(data.date) : undefined}
          onSelect={(date) => {
            setDate({ ...data, date: date ? formatTrueDate(date) : data.date });
          }}
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
