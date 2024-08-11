import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Task from "../task";
import Inbox from "../inbox";
import { useState } from "react";
import { cn } from "@/lib/utils";
import IcTask from "@/assets/ic-task";
import IcInbox from "@/assets/ic-inbox";
import IcCloudLightning from "@/assets/ic-cloud-lightning";

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
                "rounded-full transition-colors flex items-center justify-center bg-primary-100 hover:bg-primary-100/80 w-10 h-10",
                taskOpen &&
                  "bg-indicator-100 hover:bg-indicator-100/80 p-2 absolute top-0 bottom-0 left-2 w-full h-full",
                inboxOpen &&
                  "bg-indicator-200 hover:bg-indicator-200/80 p-2 absolute top-0 bottom-0 left-2 w-full h-full"
              )}
            >
              {taskOpen ? (
                <IcTask color="#F2F2F2" />
              ) : inboxOpen ? (
                <IcInbox color="#F2F2F2" />
              ) : (
                <IcCloudLightning color="#F2F2F2" />
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="left"
          className=" p-0 pr-2 bg-transparent w-fit min-w-0 rounded-none shadow-none border-none flex items-center gap-2"
        >
          <DropdownMenuItem
            className="rounded-none p-0"
            onSelect={() => setTaskOpen(true)}
          >
            <div className="flex items-center justify-center flex-col gap-1 rounded-none bg-[#333333]">
              <span className="text-primary-200">Task</span>
              <Button
                size={"icon"}
                className="bg-primary-200 hover:bg-primary-200/80 rounded-full p-2"
              >
                <IcTask color="#F8B76B" />
              </Button>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded-none p-0"
            onSelect={() => setInboxOpen(true)}
          >
            <div className="flex items-center justify-center flex-col gap-1 rounded-none bg-[#333333]">
              <span className="text-primary-200">Inbox</span>
              <Button
                size={"icon"}
                className="bg-primary-200 hover:bg-primary-200/80 rounded-full p-2"
              >
                <IcInbox color="#8785FF" />
              </Button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Task open={taskOpen} setOpen={setTaskOpen} />
      <Inbox open={inboxOpen} setOpen={setInboxOpen} />
    </>
  );
};

export default Menu;
