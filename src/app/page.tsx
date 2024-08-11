"use client";
import Menu from "@/components/shared/menu";

export const Page = () => {
  return (
    <main className="p-8 h-screen flex bg-[#333333]">
      <div className="self-end ms-auto">
        <Menu />
      </div>
    </main>
  );
};

export default Page;
