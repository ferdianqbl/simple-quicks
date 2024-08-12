import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import React, { ChangeEvent, FC, useState } from "react";
import DropdownTaskItem from "./dropdown-task-item";
import TaskItemCalendar from "./task-item-calendar";
import TaskItemDescription from "./task-item-description";
import { cn } from "@/lib/utils";
import { TTaskItem } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { format, formatDistanceToNow } from "date-fns";

type Props = {
  dataActive: {
    isActive: boolean;
    setActive: (active: string) => void;
  };
  data: TTaskItem;
  onChangeData: {
    edit: (data: TTaskItem) => void;
    delete: (id: number) => void;
  };
};

const TaskItem: FC<Props> = ({ dataActive, data, onChangeData }) => {
  const [isTitleEditing, setIsTitleEditing] = useState(data.title === "");
  const [dataContainer, setDataContainer] = useState<TTaskItem>(data);

  const handleTitleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsTitleEditing(true);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "")
      setDataContainer({ ...dataContainer, title: "" });
    else setDataContainer({ ...dataContainer, title: e.target.value });
  };

  const handleTitleBlur = () => {
    onChangeData.edit({ ...data, title: dataContainer.title });
    setIsTitleEditing(false);
  };

  return (
    <AccordionItem value={data.id.toString()} className="border-primary-500">
      <div className="flex items-center gap-1 w-full h-full">
        <Checkbox
          className=""
          checked={data.status === "completed"}
          onCheckedChange={() => {
            onChangeData.edit({
              ...data,
              status: data.status === "completed" ? "pending" : "completed",
            });
          }}
        />
        <AccordionTrigger className="w-full flex items-center justify-between gap-4 hover:no-underline">
          <div
            onClick={handleTitleClick}
            className="cursor-pointer w-full text-start"
          >
            {isTitleEditing ? (
              <Input
                value={dataContainer.title}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 ring-offset-0"
                placeholder="Add a Title"
                autoFocus
              />
            ) : (
              <label
                className={cn(
                  "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-fit text-start text-primary-500 font-bold cursor-pointer line-clamp-1 h-full",
                  data.status === "completed" && "line-through",
                  data.title === "" && "text-primary-400 font-normal"
                )}
              >
                {data.title || "Add a Title"}
              </label>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm">
            {data.date && (
              <>
                <span className="text-indicator-300 whitespace-nowrap">
                  {formatDistanceToNow(data.date, { addSuffix: true })}
                </span>
                <span className="text-primary-500 whitespace-nowrap">
                  {format(data.date, "dd/MM/yyyy")}
                </span>
              </>
            )}
          </div>
        </AccordionTrigger>
        <DropdownTaskItem data={data} setData={onChangeData.delete} />
      </div>
      <AccordionContent>
        <div className="flex flex-col gap-4 items-start">
          <TaskItemCalendar data={data} setDate={onChangeData.edit} />
          <TaskItemDescription data={data} setDescription={onChangeData.edit} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TaskItem;
