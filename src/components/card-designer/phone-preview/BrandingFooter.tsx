
import React from 'react';

export const BrandingFooter: React.FC = () => {
  return (
    <div className="mt-auto">
      <div className="text-center mt-auto mx-0">
        <div className="flex justify-center items-center mb-2">
          <div className="bg-white p-2 rounded-md" style={{ width: 'calc(100% - 32px)', margin: '0 16px' }}>
            <img 
              src="/lovable-uploads/7c8416f8-0422-4563-8dfe-5c6bbf27083f.png" 
              alt="Barcode" 
              className="h-10 w-full object-contain" 
            />
          </div>
        </div>
        <div className="text-xs mt-2 mb-4 opacity-70 text-center" dir="rtl">صمم بواسطة درهم</div>
      </div>
    </div>
  );
};
