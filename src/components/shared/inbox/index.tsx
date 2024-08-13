"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoaderCircleIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import InboxView from "./inbox-view";
import ChatView from "./chat-view";
import InboxData from "./inbox-data.json";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const Inbox: FC<Props> = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("inbox");
  const [data, setData] = useState(InboxData);
  const [inboxId, setInboxId] = useState(0);

  const fetchingData = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      fetchingData();
      setView("inbox");
    }
  }, [open]);

  if (loading)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <LoaderCircleIcon className="w-8 h-8 animate-spin text-primary-400" />
            <span className="text-primary-500 text-sm">Loading Chats...</span>
          </div>
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        {view === "inbox" ? (
          <InboxView
            setChatView={setView}
            setInboxId={setInboxId}
            data={data}
          />
        ) : (
          <ChatView
            chatData={data.filter((item) => item.id === inboxId)[0]}
            setChatView={setView}
            setOpen={setOpen}
            setInboxData={setData}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Inbox;
