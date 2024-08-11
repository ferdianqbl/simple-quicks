"use client";
import Menu from "@/components/shared/menu";

export const Page = () => {
  return (
    <main className="container h-screen flex py-8 bg-primary-500">
      <div className="self-end ms-auto">
        <Menu />
      </div>
    </main>
  );
};

export default Page;
