import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";

type Props = {
  data: string;
  setData: (data: string) => void;
};

const TaskViewSelect: FC<Props> = ({ data, setData }) => {
  return (
    <Select
      value={data.toLowerCase()}
      onValueChange={(e) => {
        if (e === "default") setData("all");
        else setData(e);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={data === "all" && "My Tasks"} title="text" />
      </SelectTrigger>
      <SelectContent className="">
        <SelectItem value="all">My Tasks</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TaskViewSelect;
