import { FC } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const Task: FC<Props> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        Place content for the popover here. <br /> This can be any valid JSX
        component. Place content for the popover here. <br /> This can be any
        valid JSX component. Place content for the popover here. <br /> This can
        be any valid JSX component. Place content for the popover here. <br />{" "}
        This can be any valid JSX component. Place content for the popover here.{" "}
        <br /> This can be any valid JSX component. Place content for the
        popover here. <br /> This can be any valid JSX component. Place content
        for the popover here. <br /> This can be any valid JSX component. Place
        content for the popover here. <br /> This can be any valid JSX
        component. Place content for the popover here. <br /> This can be any
        valid JSX component. Place content for the popover here. <br /> This can
        be any valid JSX component. Place content for the popover here. <br />{" "}
        This can be any valid JSX component.
      </DialogContent>
    </Dialog>
  );
};

export default Task;
