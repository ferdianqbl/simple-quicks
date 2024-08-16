"use client";
import * as React from "react";
import { BookmarkIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TTaskItem } from "@/lib/types";

type SelectData = Record<"value" | "label", string>;

const data = [
  {
    value: "Important ASAP",
    label: "Important ASAP",
  },
  {
    value: "Offline Meeting",
    label: "Offline Meeting",
  },
  {
    value: "Virtual Meeting",
    label: "Virtual Meeting",
  },
  {
    value: "ASAP",
    label: "ASAP",
  },
  {
    value: "Client Related",
    label: "Client Related",
  },
  {
    value: "Self Task",
    label: "Self Task",
  },
  {
    value: "Appointments",
    label: "Appointments",
  },
  {
    value: "Court Related",
    label: "Court Related",
  },
] satisfies SelectData[];

const colors = [
  "#E5F1FF",
  "#FDCFA4",
  "#F9E9C3",
  "#AFEBDB",
  "#CBF1C2",
  "#CFCEF9",
  "#F9E0FD",
  "#9DD0ED",
];

type Props = {
  dataMain: TTaskItem;
  setDataMain: (data: TTaskItem) => void;
};

const MultiSelect: React.FC<Props> = ({ dataMain, setDataMain }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<SelectData[]>(dataMain.tags);
  const [inputValue, setInputValue] = React.useState("");
  //  setDescription({ ...data, description: e.target.value });
  const handleUnselect = React.useCallback((data: SelectData) => {
    setSelected((prev) => prev.filter((s) => s.value !== data.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = data.filter((item) => !selected.includes(item));

  React.useEffect(() => {
    setDataMain({ ...dataMain, tags: selected.length > 0 ? selected : [] });
  }, [selected]);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="flex items-start gap-4 group rounded-md px-3 py-2 text-sm bg-[#F9F9F9]">
        <div className="w-fit h-fit">
          <BookmarkIcon
            className={cn(
              "h-4 w-4",
              dataMain.tags.length > 0 && "text-primary-100"
            )}
          />
        </div>
        <div className="flex flex-wrap gap-1 items-center">
          {selected.map((framework, index) => {
            return (
              <Badge
                key={framework.value}
                variant="secondary"
                style={{
                  backgroundColor: `${colors[index]}`,
                }}
              >
                {framework.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={selected.length > 0 ? "" : "Add a tag"}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 ring-offset-0 border-none flex-1 p-0 bg-[#F9F9F9] text-[#333333] text-sm"
          />
        </div>
      </div>
      <div className="">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in animate-out">
              <CommandGroup className="h-32 overflow-auto">
                {selectables.map((data, index) => {
                  return (
                    <CommandItem
                      key={data.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev) => [...prev, data]);
                      }}
                      className={"cursor-pointer"}
                    >
                      <span
                        className="px-4 text-sm rounded-full"
                        style={{
                          backgroundColor: `${colors[index]}`,
                        }}
                      >
                        {data.label}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
};

export default MultiSelect;
