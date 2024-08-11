import { Input } from "@/components/ui/input";
import React from "react";
import InboxCard from "./inbox-card";
import { SearchIcon } from "lucide-react";

const InboxView = () => {
  return (
    <div className="flex flex-col">
      <Input
        placeholder="Search"
        type="text"
        isSearch
        className="border-primary-400"
      />
      {Array.from({ length: 10 }).map((_, i) => (
        <>
          <InboxCard key={i} />
          {i < 9 && <div className="border border-primary-400 w-full"></div>}
        </>
      ))}
    </div>
  );
};

export default InboxView;
