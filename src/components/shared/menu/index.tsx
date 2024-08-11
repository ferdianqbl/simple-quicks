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

const Menu = () => {
  const [taskOpen, setTaskOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="relative z-50">
          <Button
            size={"icon"}
            className="rounded-full self-end ms-auto bg-primary-100 hover:bg-primary-100/80"
          >
            <Image src={icLightning} alt="ic" width={100} height={100} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="left"
          className=" p-0 pr-2 bg-transparent w-fit min-w-0 rounded-none shadow-none border-none flex items-center gap-2"
        >
          <DropdownMenuItem
            className="flex flex-col gap-1"
            onSelect={() => setTaskOpen(true)}
          >
            <span className="text-primary-200">Task</span>
            <Button
              size={"icon"}
              className="bg-primary-200 hover:bg-primary-200/80 rounded-full p-1"
            >
              <Image src={icTask} alt="ic" width={100} height={100} />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex flex-col gap-1"
            onSelect={() => setInboxOpen(true)}
          >
            <span className="text-primary-200">Inbox</span>
            <Button
              size={"icon"}
              className="bg-primary-200 hover:bg-primary-200/80 rounded-full p-1"
            >
              <Image src={icInbox} alt="ic" width={100} height={100} />
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
