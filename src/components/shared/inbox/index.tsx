"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoaderCircleIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import InboxView from "./inbox-view";
import ChatView from "./chat-view";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const Inbox: FC<Props> = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("inbox");
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
          <InboxView setChatView={setView} />
        ) : (
          <ChatView setChatView={setView} setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Inbox;
