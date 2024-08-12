import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

const TaskItemDescription = () => {
  const [description, setDescription] = useState<string | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="flex items-start gap-4 w-full">
      <div className="w-fit h-fit">
        <PencilIcon
          className={cn("h-4 w-4", description && "text-primary-100")}
        />
      </div>
      <div onClick={handleClick} className="cursor-pointer w-full">
        {isEditing ? (
          <Textarea
            className={cn(
              "w-full gap-8 text-left font-normal h-fit border-primary-500 text-primary-500 focus-visible:ring-0 ring-0 focus-visible:ring-offset-0",
              !description && "text-muted-foreground"
            )}
            value={description}
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
          <p className="break-words whitespace-normal">
            {description || "Add a description"}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskItemDescription;
