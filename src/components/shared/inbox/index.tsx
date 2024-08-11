"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC } from "react";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const Inbox: FC<Props> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">INbOXXX</DialogContent>
    </Dialog>
  );
};

export default Inbox;
