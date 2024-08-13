import { Input } from "@/components/ui/input";
import { FC } from "react";
import InboxCard from "./inbox-card";
import { Button } from "@/components/ui/button";

type Props = {
  setChatView: (chatView: string) => void;
};

const InboxView: FC<Props> = ({ setChatView }) => {
  return (
    <div className="flex flex-col px-8 py-6">
      <Input
        placeholder="Search"
        type="text"
        isSearch
        className="border-primary-400"
      />
      {Array.from({ length: 10 }).map((_, i) => (
        <Button
          key={i}
          className="bg-transparent block h-fit w-full hover:bg-transparent whitespace-normal p-0 text-base font-normal text-start"
          variant={"ghost"}
          onClick={() => setChatView("chat")}
        >
          <InboxCard key={i} id={i} />
          {i < 9 && <div className="border border-primary-400 w-full"></div>}
        </Button>
      ))}
    </div>
  );
};

export default InboxView;
