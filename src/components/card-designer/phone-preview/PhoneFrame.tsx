
import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[350px]">
      <div className="relative mx-auto overflow-hidden rounded-[38px] bg-black shadow-xl aspect-[28/57] w-full">
        {/* iPhone notch */}
        <div className="absolute top-0 z-20 w-full h-6">
          <div className="relative mx-auto w-40 h-6">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl"></div>
          </div>
        </div>
        
        {/* iPhone frame */}
        <div className="relative border-[14px] border-black rounded-[38px] bg-black overflow-hidden shadow-lg h-full">
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-[#f9f9f9] z-10 flex justify-between items-center px-5 text-xs">
            <span>9:41</span>
            <div className="flex gap-1 items-center">
              <div className="w-4 h-2.5 bg-black rounded-sm"></div>
              <div className="w-3 h-3 border-2 border-black rounded-full"></div>
            </div>
          </div>
          
          {/* Phone content */}
          <div className="pt-8 pb-0 px-0 h-full flex flex-col overflow-hidden bg-[#f2f2f7]">
            {/* App header */}
            <div className="px-4 py-2 bg-[#f2f2f7] flex items-center justify-between">
              <div className="text-lg font-semibold text-[#1c1c1e]" dir="rtl">البطاقات</div>
              <div className="h-7 w-7 rounded-full bg-[#f2f2f7] flex items-center justify-center">
                <div className="h-1 w-4 bg-[#1c1c1e] rounded-full"></div>
              </div>
            </div>
            
            {/* Main content area */}
            {children}
            
            {/* Home indicator */}
            <div className="h-1 w-32 mx-auto bg-white rounded-full mt-2 mb-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
