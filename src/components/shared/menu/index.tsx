import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import icLightning from "@/assets/ic-cloud-lightning.svg";
import Task from "../task";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Inbox from "../inbox";
import { useState } from "react";
import icInbox from "@/assets/ic-inbox.svg";
import icTask from "@/assets/ic-task.svg";
import { cn } from "@/lib/utils";

const Menu = () => {
  const [taskOpen, setTaskOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="relative z-50">
          <Button
            className={cn(
              "rounded-full self-end ms-auto bg-transparent border-none shadow-none h-fit w-fit p-0 hover:bg-transparent relative transition-all",
              (taskOpen || inboxOpen) &&
                "bg-primary-200 hover:bg-primary-200/80"
            )}
          >
            <div
              className={cn(
                "rounded-full bg-primary-500 w-10 h-10 hidden border border-primary-500 transition-all",
                (taskOpen || inboxOpen) && "block"
              )}
            ></div>
            <div
              className={cn(
                "rounded-full transition-colors flex items-center justify-center bg-primary-100 hover:bg-primary-100/80",
                (taskOpen || inboxOpen) &&
                  "bg-primary-200 hover:bg-primary-200/80 p-2 absolute top-0 bottom-0 left-2 w-full h-full"
              )}
            >
              <Image
                src={taskOpen ? icTask : inboxOpen ? icInbox : icLightning}
                alt="ic"
                width={100}
                height={100}
                className="w-10 h-10"
              />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="left"
          className=" p-0 pr-2 bg-transparent w-fit min-w-0 rounded-none shadow-none border-none flex items-center gap-2"
        >
          <DropdownMenuItem
            className="flex flex-col gap-1 border-none shadow-none"
            onSelect={() => setTaskOpen(true)}
          >
            <span className="text-primary-200">Task</span>
            <Button
              size={"icon"}
              className="bg-primary-200 hover:bg-primary-200/80 rounded-full p-2"
            >
              <Image
                src={icTask}
                alt="ic"
                width={100}
                height={100}
                className="w-10 h-10"
              />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex flex-col gap-1 border-none shadow-none"
            onSelect={() => setInboxOpen(true)}
          >
            <span className="text-primary-200">Inbox</span>
            <Button
              size={"icon"}
              className="bg-primary-200 hover:bg-primary-200/80 rounded-full p-2"
            >
              <Image
                src={icInbox}
                alt="ic"
                width={100}
                height={100}
                className="w-10 h-10"
              />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Task open={taskOpen} setOpen={setTaskOpen} />
      <Inbox open={inboxOpen} setOpen={setInboxOpen} />
    </>
  );
};

export default Menu;
