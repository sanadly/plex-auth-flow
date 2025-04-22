
import React from 'react';
import { BadgePercent } from 'lucide-react';
import { PhonePreviewProps } from './PhonePreviewProps';

export const CashbackPhonePreview: React.FC<PhonePreviewProps> = ({
  cardSettings
}) => {
  const {
    businessName,
    cashbackPercentage = '5', // Default value if not provided
    cashbackStatus = 'Bronze', // Default value if not provided
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
          <div className="text-xs opacity-70">كاش باك</div>
          <div className="text-lg font-bold">{cashbackPercentage}%</div>
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
          <div className="absolute inset-0 flex items-center justify-center">
            <BadgePercent className="h-12 w-12 opacity-40" />
          </div>
        </div>
      </div>
      
      {/* Card footer stats with tier */}
      <div className="px-5 py-4">
        <div className="flex justify-between items-start">
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">فئة الكاش باك</div>
            <div className="text-lg font-bold">{cashbackStatus}</div>
          </div>
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">المستوى التالي</div>
            <div className="text-lg font-bold">Silver</div>
          </div>
        </div>
      </div>
      
      {/* Tier progress bar */}
      <div className="px-5 pb-3">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/60 rounded-full" style={{ width: '45%' }}></div>
        </div>
        <div className="flex justify-between mt-1 text-xs opacity-70">
          <span>Bronze</span>
          <span>Silver</span>
          <span>Gold</span>
        </div>
      </div>
    </>
  );
};
