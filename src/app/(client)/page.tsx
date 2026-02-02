import { BackgroundVideo } from "./_components/BackgroundVideo";
import { TabsDemo } from "./_components/tabs";

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <BackgroundVideo />

      <div className="relative flex min-h-screen w-full  justify-center">
        <TabsDemo />
      </div>
    </div>
  );
}
