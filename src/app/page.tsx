import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export const Page = () => {
  return (
    <main className="container h-screen flex py-8">
      <Button
        size={"icon"}
        className="self-end ms-auto bg-primary-100 hover:bg-primary-100/80"
      >
        <Zap className="w-6 h-6" />
      </Button>
    </main>
  );
};

export default Page;
