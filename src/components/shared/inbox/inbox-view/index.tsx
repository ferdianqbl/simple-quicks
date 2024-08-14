import { Input } from "@/components/ui/input";
import { FC } from "react";
import InboxCard from "./inbox-card";
import { Button } from "@/components/ui/button";
import { TInboxData } from "@/lib/types";

type Props = {
  data: TInboxData[];
  setInboxId: (chatId: number) => void;
  setChatView: (chatView: string) => void;
};

const InboxView: FC<Props> = ({ setChatView, setInboxId, data }) => {
  return (
    <div className="flex flex-col px-8 py-6">
      <Input
        placeholder="Search"
        type="text"
        isSearch
        className="border-primary-400"
      />
      {data.map((inbox, index) => (
        <Button
          key={inbox.id + index}
          className="bg-transparent block h-fit w-full hover:bg-transparent whitespace-normal p-0 text-base font-normal text-start"
          variant={"ghost"}
          onClick={() => {
            setInboxId(inbox.id);
            setChatView("chat");
          }}
        >
          <InboxCard data={inbox} />
          {index < data.length - 1 && (
            <div className="border border-primary-400 w-full"></div>
          )}
        </Button>
      ))}
    </div>
  );
};

export default InboxView;
