import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";

const DropdownChatUser = () => {
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
      <DropdownMenuContent className="w-fit w-min-0">
        <DropdownMenuItem className="p-1 text-primary-100 text-sm hover:!text-primary-100">
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-1 text-indicator-300 text-sm hover:!text-indicator-300">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownChatUser;
