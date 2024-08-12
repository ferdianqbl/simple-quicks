import { FC, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TaskViewSelect from "./task-view-select";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import TaskItem from "./task-item";
import TaskData from "./task-data.json";
import { TTaskItem } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const Task: FC<Props> = ({ open, setOpen }) => {
  const [data, setData] = useState<TTaskItem[]>([]);
  const [filterData, setFilterData] = useState<string>("all");
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(true);

  const dataView =
    filterData === "all"
      ? data
      : data.filter(
          (item) => item.status.toLowerCase() === filterData.toLowerCase()
        );

  const fetchingData = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setValue("");
    setFilterData("all");
    setData(TaskData);
    setLoading(false);
  };

  const addNewTask = () => {
    const newData = {
      id: data.length + 1,
      title: "",
      description: "",
      date: "",
      status: "pending",
    };
    setData([...data, newData]);
    setValue(newData.id.toString());
  };

  const deleteTask = (id: number) => {
    setValue("");
    setData(data.filter((item) => item.id !== id));
  };

  const updateTask = (updateData: TTaskItem) => {
    setData(
      data.map((item) =>
        item.id === updateData.id
          ? {
              ...updateData,
              date: updateData.date.toString(),
              description: updateData.description.toString(),
              status: updateData.status.toString(),
              title: updateData.title.toString(),
            }
          : item
      )
    );
  };

  useEffect(() => {
    if (open) {
      fetchingData();
    }
  }, [open]);

  useEffect(() => {
    setValue("");
  }, [filterData]);

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
        <div className="relative overflow-auto h-full">
          <div className="flex items-center justify-between gap-4 fixed top-0 right-0 left-0 w-full px-8 py-3 bg-background">
            <TaskViewSelect data={filterData} setData={setFilterData} />
            <Button
              className={cn(
                "h-full w-fit",
                filterData === "completed" && "hidden"
              )}
              onClick={addNewTask}
            >
              Add Task
            </Button>
          </div>
          <Accordion
            type="single"
            collapsible
            className="max-h-[65vh] h-full overflow-auto pt-16 px-8"
            value={value}
            onValueChange={setValue}
          >
            {dataView.length > 0 ? (
              dataView.map((item) => (
                <TaskItem
                  dataActive={{
                    isActive: value === item.id.toString(),
                    setActive: setValue,
                  }}
                  key={item.id}
                  data={item}
                  onChangeData={{
                    edit: updateTask,
                    delete: deleteTask,
                  }}
                />
              ))
            ) : (
              <div className="max-h-[65vh] h-full overflow-auto px-8 text-center text-sm flex items-center justify-center">
                No Task Found.
              </div>
            )}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Task;
