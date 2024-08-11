import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  setChatView: (chatView: string) => void;
  setOpen?: (open: boolean) => void;
};

const ChatView: FC<Props> = ({ setChatView, setOpen }) => {
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
      <div className="max-h-[65vh] h-full overflow-auto px-6 pt-20">
        1 <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
        test <br />
      </div>
      <div className="flex items-center absolute bottom-0 right-0 left-0 w-full pb-2 px-6 gap-4">
        <Input
          placeholder="Type a new message"
          type="text"
          className="w-full"
        />
        <Button className=" w-fit h-full">Send</Button>
      </div>
    </div>
  );
};

export default ChatView;
