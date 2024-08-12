import { Textarea } from "@/components/ui/textarea";
import { TTaskItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import React, { ChangeEvent, FC, useState } from "react";

type Props = {
  data: TTaskItem;
  setDescription: (data: TTaskItem) => void;
};

const TaskItemDescription: FC<Props> = ({ data, setDescription }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription({ ...data, description: e.target.value });
  };

  return (
    <div className="flex items-start gap-4 w-full">
      <div className="w-fit h-fit">
        <PencilIcon
          className={cn("h-4 w-4", data?.description && "text-primary-100")}
        />
      </div>
      <div onClick={handleClick} className="cursor-pointer w-full">
        {isEditing ? (
          <Textarea
            className={cn(
              "w-full gap-8 text-left font-normal h-fit border-primary-500 text-primary-500 focus-visible:ring-0 ring-0 focus-visible:ring-offset-0",
              !data.description && "text-muted-foreground"
            )}
            value={data.description}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            onFocus={(e) =>
              e.target.setSelectionRange(
                e.target.value.length,
                e.target.value.length
              )
            }
            placeholder="Add a description"
            rows={10}
          />
        ) : (
          <p
            className={cn(
              "break-words whitespace-normal",
              data.description === "" && "text-muted-foreground"
            )}
          >
            {data.description || "Add a description"}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskItemDescription;
