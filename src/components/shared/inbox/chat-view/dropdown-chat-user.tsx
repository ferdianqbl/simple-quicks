import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditStore } from "@/lib/hooks/use-edit-store";
import { useReplyStore } from "@/lib/hooks/use-reply-store";
import { TMessage } from "@/lib/types";
import { format } from "date-fns";
import { EllipsisIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  role: string;
  data: TMessage;
  onChangeData: {
    delete: (messageId: number, timestamp: string) => void;
  };
};

const DropdownChatUser: FC<Props> = ({ data, onChangeData, role }) => {
  const { setIsEdit, setEditData } = useEditStore();
  const { setIsReply, setReplyData } = useReplyStore();
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
      <DropdownMenuContent className="w-fit w-min-0" align="start">
        {role === "user" ? (
          <DropdownMenuItem
            className="p-1 text-primary-100 text-sm hover:!text-primary-100"
            onClick={() => {
              setIsEdit(true);
              setEditData(data);
            }}
          >
            Edit
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem
              className="p-1 text-primary-100 text-sm hover:!text-primary-100"
              // onClick={() => {
              //   setIsEdit(true);
              //   setEditData(data);
              // }}
            >
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="p-1 text-primary-100 text-sm hover:!text-primary-100"
              onClick={() => {
                setIsReply(true);
                setReplyData(data);
              }}
            >
              Reply
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="p-1 text-indicator-300 text-sm hover:!text-indicator-300"
          onClick={() =>
            onChangeData.delete(
              data.id,
              format(new Date(data.timestamp), "yyyy-MM-dd")
            )
          }
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownChatUser;
