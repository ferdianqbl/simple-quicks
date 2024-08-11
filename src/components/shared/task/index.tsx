import { FC } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const Task: FC<Props> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>Place content for the popover here.</DialogContent>
    </Dialog>
  );
};

export default Task;
