"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, LoaderCircleIcon, XIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ChatUserCard from "./chat-user-card";
import { format } from "date-fns";
import { TChatData, TInboxData, TMessage } from "@/lib/types";
import { useEditStore } from "@/lib/hooks/use-edit-store";
import { useReplyStore } from "@/lib/hooks/use-reply-store";
import { cn } from "@/lib/utils";

const colors = [
  {
    color: "#9b51e0",
    bg: "#eedcff",
  },
  {
    color: "#E5A443",
    bg: "#FCEED3",
  },
  {
    color: "#43B78D",
    bg: "#D2F2EA",
  },
];

type Props = {
  chatData: TInboxData;
  setChatView: (chatView: string) => void;
  setInboxData: (data: TInboxData) => void;
  setOpen?: (open: boolean) => void;
};

const ChatView: FC<Props> = ({
  chatData,
  setChatView,
  setOpen,
  setInboxData,
}) => {
  const [loading, setLoading] = useState(true);
  const { isEdit, setIsEdit, editData, setEditData } = useEditStore();
  const { isReply, replyData, setIsReply, setReplyData } = useReplyStore();
  const data: TInboxData = chatData;
  const [dataInput, setDataInput] = useState<{
    message: string;
    sender: number;
  }>({
    message: "",
    sender: 1,
  });
  const fetchingData = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const addNewMessage = ({
    message,
    sender,
  }: {
    message: string;
    sender: number;
  }) => {
    const dataToday = chatData.contents.filter(
      (chat) =>
        format(new Date(chat.date), "dd MMMM yyyy") ===
        format(new Date(), "dd MMMM yyyy")
    );

    if (dataToday.length > 0) {
      const chatIndex = chatData.contents.findIndex(
        (chat) => chat.date === dataToday[0].date
      );

      const newMessage: TMessage = {
        id: chatData.contents[chatIndex].messages.length + 1,
        sender: sender,
        message: message,
        timestamp: new Date().toString(),
        reply: isReply
          ? {
              ...replyData,
              name:
                chatData.participants.find((p) => p.id === replyData.sender)
                  ?.name || "",
            }
          : undefined,
      };

      data.contents[chatIndex].messages.push(newMessage);
    } else {
      const newChat = {
        date: format(new Date(), "yyyy-MM-dd"),
        messages: [
          {
            id: 1,
            sender: sender,
            message: message,
            timestamp: new Date().toString(),
            reply: isReply
              ? {
                  ...replyData,
                  name:
                    chatData.participants.find((p) => p.id === replyData.sender)
                      ?.name || "",
                }
              : undefined,
          },
        ],
      };
      data.contents.push(newChat);
    }

    setInboxData(data);
    setDataInput({ message: "", sender: 1 });
    setIsReply(false);
    setReplyData({ id: 0, message: "", sender: 0, timestamp: "" });
    setIsEdit(false);
    setEditData({ id: 0, message: "", sender: 0, timestamp: "" });
  };

  const updateMessage = (updateData: TMessage) => {
    const content = data.contents.find(
      (chat) =>
        chat.date === format(new Date(updateData.timestamp), "yyyy-MM-dd")
    );

    if (!content) return;

    const updatedMessages = content.messages.map((message) => {
      if (message.id === updateData.id) {
        return updateData;
      }
      return message;
    });

    const updatedContents = data.contents.map((chat) => {
      if (chat.date === format(new Date(updateData.timestamp), "yyyy-MM-dd")) {
        return { ...chat, messages: updatedMessages };
      }
      return chat;
    });

    const updatedChatData: TInboxData = {
      ...chatData,
      contents: updatedContents,
    };

    setInboxData(updatedChatData);
    setIsEdit(false);
    setEditData({ id: 0, message: "", sender: 0, timestamp: "" });
    setDataInput({ message: "", sender: 1 });
  };

  const deleteMessage = (messageId: number, timestamp: string) => {
    const chatIndex = chatData.contents.findIndex(
      (chat) => chat.date === timestamp
    );
    const newMessages = chatData.contents[chatIndex].messages.filter(
      (message) => message.id !== messageId
    );
    data.contents[chatIndex].messages = newMessages;

    setInboxData(data);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div className="relative overflow-auto h-full">
      <div className="bg-[#FFFFFF] flex items-center justify-between gap-8 border-b border-[#BDBDBDBD] pb-2  fixed top-0 right-0 left-0 w-full pt-6">
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
            <span className="text-sm line-clamp-1">
              {chatData.participants.length} participants
            </span>
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
          {chatData.contents.map((chat, index) => (
            <>
              {chat.messages.length > 0 && (
                <div
                  className="w-full text-center text-sm flex items-center gap-2"
                  key={chat.date}
                >
                  <div className="w-full h-[1px] bg-primary-500"></div>
                  <span className="w-fit whitespace-nowrap text-primary-500 font-bold">
                    {format(new Date(chat.date), "dd MMMM yyyy")}
                  </span>
                  <div className="w-full h-[1px] bg-primary-500"></div>
                </div>
              )}
              {/* {chat.messages.length > 0 && (
                <div
                  className="w-full text-center text-sm flex items-center gap-2"
                  key={chat.date}
                >
                  <div className="w-full h-[1px] bg-indicator-300"></div>
                  <span className="w-fit whitespace-nowrap text-indicator-300 font-bold">
                    New Messages
                  </span>
                  <div className="w-full h-[1px] bg-indicator-300"></div>
                </div>
              )} */}
              {chat.messages.map((message) => (
                <ChatUserCard
                  onChangeData={{ delete: deleteMessage }}
                  role={message.sender === 1 ? "user" : "team"}
                  bgChat={
                    message.sender === 1
                      ? colors[0].bg
                      : colors[
                          data.participants.findIndex(
                            (item) => item.id === message.sender
                          )
                        ].bg
                  }
                  color={
                    message.sender === 1
                      ? colors[0].color
                      : colors[
                          data.participants.findIndex(
                            (item) => item.id === message.sender
                          )
                        ].color
                  }
                  data={{
                    participants: chatData.participants,
                    messages: message,
                  }}
                />
              ))}
            </>
          ))}
        </div>
      )}

      <div className="flex flex-col fixed bottom-0 right-0 left-0 w-full py-2 px-6 z-0 bg-background">
        {loading && (
          <div className="bg-stickers-100 px-4 py-2 rounded-md text-primary-500 font-bold text-sm flex items-center gap-1 mb-4">
            <LoaderCircleIcon className="w-4 h-4 animate-spin text-primary-100" />
            Please wait while we connect you with one of our team...
          </div>
        )}

        <div className="flex items-end gap-4">
          <div className="w-full flex-1">
            {isReply && (
              <div className="bg-primary-200 border-primary-500 border px-4 py-2 rounded-t-md text-primary-400  text-sm flex gap-1 flex-col">
                <div className="flex items-start font-bold w-full justify-between text-primary-500">
                  Replying to{" "}
                  {
                    chatData.participants.find((p) => p.id === replyData.sender)
                      ?.name
                  }
                  <Button
                    className="p-0 w-fit h-fit"
                    variant={"ghost"}
                    onClick={() => {
                      setIsReply(false);
                      setReplyData({
                        id: 0,
                        message: "",
                        sender: 0,
                        timestamp: "",
                      });
                    }}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p>
                  {replyData.message.length > 50
                    ? `${replyData.message.slice(0, 50)}...`
                    : replyData.message}
                </p>
              </div>
            )}
            <Input
              placeholder="Type a new message"
              type="text"
              className={cn(
                "w-full border-primary-500 focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 ring-offset-0",
                isReply && "rounded-t-none border-t-0"
              )}
              value={isEdit ? editData.message : dataInput.message}
              onChange={(e) =>
                isEdit
                  ? setEditData({ ...editData, message: e.target.value })
                  : setDataInput({ ...dataInput, message: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-1">
            {isEdit ? (
              <>
                <Button
                  className=" w-fit h-full"
                  type="button"
                  onClick={() => updateMessage(editData)}
                >
                  Edit
                </Button>
                <Button
                  className="w-fit h-full"
                  type="button"
                  variant={"ghost"}
                  onClick={() => {
                    setIsEdit(false);
                    setEditData({
                      id: 0,
                      message: "",
                      sender: 0,
                      timestamp: "",
                    });
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                className=" w-fit h-full"
                type="button"
                onClick={() => addNewMessage(dataInput)}
              >
                Send
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
