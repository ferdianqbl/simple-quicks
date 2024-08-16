export type TTaskItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  status: string;
  tags: Record<"value" | "label", string>[];
};

export type TParticipant = {
  id: number;
  name: string;
};

export type TMessage = {
  id: number;
  sender: number;
  message: string;
  timestamp: string;
  reply?: {
    name: string;
  } & TMessage;
};

export type TChatData = {
  date: string;
  messages: TMessage[];
};

export type TInboxData = {
  id: number;
  participants: TParticipant[];
  contents: TChatData[];
};
