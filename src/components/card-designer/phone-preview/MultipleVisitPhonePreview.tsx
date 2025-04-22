
import React from 'react';
import { CreditCard, Clock } from 'lucide-react';
import { PhonePreviewProps } from './PhonePreviewProps';

export const MultipleVisitPhonePreview: React.FC<PhonePreviewProps> = ({
  cardSettings
}) => {
  const {
    businessName,
    programName,
    cardBorderColor,
    cardTextColor,
    cardBackgroundImage,
    visitsCount,
    visitsTotal
  } = cardSettings;

  // Calculate the visit progress
  const visitProgress = (visitsTotal / visitsCount) * 100;

  return (
    <>
      {/* Card header */}
      <div className="px-5 py-4 flex justify-between items-center" 
            style={{ 
              borderColor: cardBorderColor, 
              borderBottomWidth: '1px', 
              borderBottomStyle: 'solid',
              opacity: 0.8
            }}
      >
        <div className="text-lg font-bold">
          {businessName}
        </div>
        <div className="text-right">
          <div className="text-xs opacity-70" style={{ color: cardTextColor }}>الزيارات</div>
          <div className="text-lg font-bold" style={{ color: cardTextColor }}>{visitsTotal}/{visitsCount}</div>
        </div>
      </div>
      
      {/* Card content area */}
      <div className="relative">
        <div className="overflow-hidden h-24">
          {cardBackgroundImage && (
            <div className="absolute inset-0">
              <img 
                src={cardBackgroundImage} 
                alt="Background" 
                className="w-full h-full object-cover opacity-30"
              />
            </div>
          )}
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[90%] bg-white/70 rounded-full h-4 mb-2 overflow-hidden">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${visitProgress}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between w-full max-w-[90%]">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-indigo-500" />
                <span className="text-xs font-medium">زيارة {visitsTotal}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-medium">الهدف: {visitsCount}</span>
                <CreditCard className="h-4 w-4 ml-1 text-indigo-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card footer stats */}
      <div className="px-5 py-4">
        <div className="flex justify-between items-start">
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">{programName}</div>
            <div className="text-lg font-bold">{businessName}</div>
          </div>
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">الزيارات المتبقية للمكافأة</div>
            <div className="text-lg font-bold">{visitsCount - visitsTotal}</div>
          </div>
        </div>
      </div>
      
      {/* QR code or barcode placeholder */}
      <div className="px-5 pb-3">
        <div className="h-12 bg-white/80 rounded-md flex items-center justify-center">
          <div className="text-gray-800 text-sm font-bold">رمز البطاقة</div>
        </div>
      </div>
    </>
  );
};
