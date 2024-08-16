"use client";
import Menu from "@/components/shared/menu";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <main className="h-screen flex bg-[#333333] min-w-[100vw]">
      <div className="border-r border-primary-200 h-full w-40"></div>
      <Input
        className="rounded-none mx-auto w-full max-w-[100vw] h-fit bg-primary-500 border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 ring-offset-0 text-primary-200 flex-row-reverse focus-within:ring-0 focus-within:ring-offset-0 pl-3"
        inputSearchClassName="rounded-none mx-auto w-full max-w-[100vw] h-fit bg-primary-500 border-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 ring-offset-0 text-primary-200 flex-row-reverse"
        isSearch
      />
      <div className="absolute bottom-0 right-0 p-8">
        <Menu />
      </div>
    </main>
  );
};

export default Page;
