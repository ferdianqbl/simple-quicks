import { FC } from "react";
import DropdownChatUser from "./dropdown-chat-user";
import { cn } from "@/lib/utils";
import { TChatData, TMessage, TParticipant } from "@/lib/types";
import { format } from "date-fns";

type Props = {
  role: "user" | "team";
  color?: string;
  bgChat?: string;
  data: {
    participants: TParticipant[];
    messages: TMessage;
  };
  onChangeData: {
    delete: (messageId: number, timestamp: string) => void;
  };
};

const ChatUserCard: FC<Props> = ({
  role,
  color,
  bgChat,
  data,
  onChangeData,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-end",
        role === "team" ? "items-start" : "items-end"
      )}
    >
      <span
        className="text-chats-400 text-sm"
        style={{
          color: color,
        }}
      >
        {
          data.participants.filter(
            (participant) => participant.id === data.messages.sender
          )[0].name
        }
      </span>
      <div
        className={cn(
          "flex gap-1",
          role === "team" ? "flex-row-reverse" : "flex-row"
        )}
      >
        <DropdownChatUser
          role={role}
          onChangeData={onChangeData}
          data={data.messages}
        />
        <div className="flex flex-col gap-1 justify-end items-end">
          {data.messages.reply && (
            <div className="bg-primary-200 border-primary-300 border px-4 py-2 text-primary-400 rounded-md text-sm flex gap-1 flex-col">
              <span className="flex items-start font-bold w-full justify-between text-primary-500">
                Replying to {data.messages.reply.name}
              </span>
              <p>
                {data.messages.reply.message.length > 50
                  ? `${data.messages.reply.message.slice(0, 50)}...`
                  : data.messages.reply.message}
              </p>
            </div>
          )}
          <div
            className="w-fit p-2 bg-chats-300 rounded-md text-primary-500 flex flex-col gap-1"
            style={{
              backgroundColor: bgChat,
            }}
          >
            <p className="text-sm">{data.messages.message}</p>
            <span className="text-xs">
              {format(new Date(data.messages.timestamp), "HH:mm")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUserCard;
