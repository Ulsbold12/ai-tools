import Hyperspeed from "@/components/Hyperspeed";
import { TabsDemo } from "./_components/tabs";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Hyperspeed />
      </div>

      <div className="relative flex  justify-center ">
        <TabsDemo />
      </div>
    </div>
  );
}
