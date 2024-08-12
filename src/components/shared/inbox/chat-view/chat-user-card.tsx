import { FC } from "react";
import DropdownChatUser from "./dropdown-chat-user";
import { cn } from "@/lib/utils";

type Props = {
  role: "user" | "team";
  color?: string;
  bgChat?: string;
};

const ChatUserCard: FC<Props> = ({ role, color, bgChat }) => {
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
        You
      </span>
      <div
        className={cn(
          "flex gap-1",
          role === "team" ? "flex-row-reverse" : "flex-row"
        )}
      >
        <DropdownChatUser />
        <div
          className="w-fit p-2 bg-chats-300 rounded-md text-primary-500 flex flex-col gap-1"
          style={{
            backgroundColor: bgChat,
          }}
        >
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptates, nemo? Distinctio ex dolorum vero! Autem, amet.
            Repellendus quidem eos aliquam! Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Voluptates, nemo? Distinctio ex
            dolorum vero! Autem, amet. Repellendus quidem eos aliquam! Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Voluptates,
            nemo? Distinctio ex dolorum vero! Autem, amet. Repellendus quidem
            eos aliquam! Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Voluptates, nemo? Distinctio ex dolorum vero! Autem, amet.
            Repellendus quidem eos aliquam! Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Voluptates, nemo? Distinctio ex
            dolorum vero! Autem, amet. Repellendus quidem eos aliquam!
          </p>
          <span className="text-xs">19:32</span>
        </div>
      </div>
    </div>
  );
};

export default ChatUserCard;
