import { FC, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TaskViewSelect from "./task-view-select";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TaskItem from "./task-item";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const Task: FC<Props> = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("inbox");
  const fetchingData = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      fetchingData();
    }
  }, [open]);

  if (loading)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <LoaderCircleIcon className="w-8 h-8 animate-spin text-primary-400" />
            <span className="text-primary-500 text-sm">
              Loading Task List...
            </span>
          </div>
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <TaskViewSelect />
            <Button className="h-full w-fit">New Task</Button>
          </div>
          <Accordion type="single" collapsible>
            <TaskItem />
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Task;
