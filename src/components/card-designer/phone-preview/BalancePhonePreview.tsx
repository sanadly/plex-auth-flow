
import React from 'react';
import { PhonePreviewProps } from './PhonePreviewProps';

export const BalancePhonePreview: React.FC<PhonePreviewProps> = ({
  cardSettings
}) => {
  const {
    businessName,
    balance,
    cardBorderColor,
    cardBackgroundImage
  } = cardSettings;

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
          <div className="text-xs opacity-70">الرصيد</div>
          <div className="text-lg font-bold">{balance}</div>
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
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}></div>
        </div>
      </div>
      
      {/* Card footer stats */}
      <div className="px-5 py-4">
        <div className="flex justify-between items-start">
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">المكافأة</div>
            <div className="text-lg font-bold">لا بيانات</div>
          </div>
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">حتى المكافأة التالية</div>
            <div className="text-lg font-bold">{balance}</div>
          </div>
        </div>
      </div>
    </>
  );
};
