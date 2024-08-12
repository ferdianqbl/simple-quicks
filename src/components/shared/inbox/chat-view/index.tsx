"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, LoaderCircleIcon, XIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ChatUserCard from "./chat-user-card";

type Props = {
  setChatView: (chatView: string) => void;
  setOpen?: (open: boolean) => void;
};

const ChatView: FC<Props> = ({ setChatView, setOpen }) => {
  const [loading, setLoading] = useState(true);
  const fetchingData = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div className="relative overflow-auto h-full">
      <div className="bg-[#FFFFFF] flex items-center justify-between gap-8 border-b border-[#BDBDBDBD] pb-2  absolute top-0 right-0 left-0 w-full pt-6">
        <div className="flex items-center gap-3 pl-6">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground h-fit w-fit p-1"
            onClick={() => setChatView("inbox")}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <span className="font-bold text-primary-100 line-clamp-1">
              Jeannette Moraima Guaman Chamba (Hutto l-589) [Hutto Follow Up -
              Brief Service]
            </span>
            <span className="text-sm line-clamp-1">3 Participants</span>
          </div>
        </div>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground h-fit w-fit p-1 mr-6"
          onClick={() => {
            setOpen && setOpen(false);
            setChatView("inbox");
          }}
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
      {!loading && (
        <div className="max-h-[65vh] h-full overflow-auto px-6 pt-24 pb-11 flex flex-col gap-4">
          <ChatUserCard role="user" />
          <ChatUserCard role="team" bgChat="#FCEED3" color="#E5A443" />
          <ChatUserCard role="user" />
          <div className="w-full text-center text-sm flex items-center gap-2">
            <div className="w-full h-[1px] bg-primary-500"></div>
            <span className="w-fit whitespace-nowrap text-primary-500 font-bold">
              Today June 09, 2021
            </span>
            <div className="w-full h-[1px] bg-primary-500"></div>
          </div>
          <ChatUserCard role="user" />
          <ChatUserCard role="team" bgChat="#FCEED3" color="#E5A443" />
          <ChatUserCard role="user" />
        </div>
      )}
      <div className="absolute bottom-0 right-0 left-0 w-full pb-2 px-6 gap-4 z-0">
        test
      </div>
      <div className="flex flex-col absolute bottom-0 right-0 left-0 w-full pb-2 px-6 gap-4 z-0">
        {loading && (
          <div className="bg-stickers-100 px-4 py-2 rounded-md text-primary-500 font-bold text-sm flex items-center gap-1">
            <LoaderCircleIcon className="w-4 h-4 animate-spin text-primary-100" />
            Please wait while we connect you with one of our team...
          </div>
        )}
        <div className="flex items-center gap-4">
          <Input
            placeholder="Type a new message"
            type="text"
            className="w-full"
          />
          <Button className=" w-fit h-full">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
