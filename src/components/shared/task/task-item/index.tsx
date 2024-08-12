import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import DropdownTaskItem from "./dropdown-task-item";
import TaskItemCalendar from "./task-item-calendar";
import TaskItemDescription from "./task-item-description";

const TaskItem = () => {
  return (
    <AccordionItem value="item-1">
      <div className="flex items-center gap-1 w-full">
        <Checkbox />
        <AccordionTrigger className="w-full flex items-center justify-between gap-4 hover:no-underline">
          <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full text-start text-primary-500 font-bold cursor-pointer">
            Accept terms and conditions
          </label>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-indicator-300 whitespace-nowrap">
              2 Days left
            </span>
            <span className="text-primary-500 whitespace-nowrap">
              12/06/2021
            </span>
          </div>
        </AccordionTrigger>
        <DropdownTaskItem />
      </div>
      <AccordionContent>
        <div className="flex flex-col gap-4 items-start">
          <TaskItemCalendar />
          <TaskItemDescription />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TaskItem;
