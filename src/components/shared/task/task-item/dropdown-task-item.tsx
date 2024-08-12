import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TTaskItem } from "@/lib/types";
import { EllipsisIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  data: TTaskItem;
  setData: (id: number) => void;
};

const DropdownTaskItem: FC<Props> = ({ data, setData }) => {
  const handleDelete = () => {
    setData(data.id);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"link"}
          size={"icon"}
          className="p-0 h-fit w-fit text-primary-500"
        >
          <EllipsisIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit w-min-0" align="end">
        <DropdownMenuItem
          className="p-1 text-indicator-300 text-sm hover:!text-indicator-300"
          onClick={handleDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownTaskItem;
