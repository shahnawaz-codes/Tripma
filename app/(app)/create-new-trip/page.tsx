import { ChatBox } from "@/app/_components/createTrip/ChatBox";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const CreateTrip = () => {
  return (
    <div className="w-full h-[calc(100vh-70px)]">
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
          <p className="text-gray-500 font-medium">Map Area (Coming Soon)</p>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CreateTrip;
