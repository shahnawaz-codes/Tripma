import { ChatBox } from "@/app/_components/createTrip/ChatBox";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Itinerary from "@/app/_components/createTrip/Itinerary";

const CreateTrip = () => {
  return (
    <div className="w-full h-[calc(100vh-70px)] overflow-hidden">
      <ResizablePanelGroup orientation="horizontal" className="w-full h-full">
        {/* chat box */}
        <ResizablePanel
          defaultSize={40}
          minSize={25}
          className="bg-white min-w-full lg:min-w-0"
        >
          <ChatBox />
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden lg:flex" />
        {/* display map and area place  */}
        <ResizablePanel
          defaultSize={60}
          minSize={30}
          className="hidden lg:flex items-center justify-center bg-slate-100"
        >
          <Itinerary />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CreateTrip;
