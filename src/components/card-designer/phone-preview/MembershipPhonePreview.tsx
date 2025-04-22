
import React from 'react';
import { UserCircle } from 'lucide-react';
import { PhonePreviewProps } from './PhonePreviewProps';

export const MembershipPhonePreview: React.FC<PhonePreviewProps> = ({
  cardSettings
}) => {
  const {
    businessName,
    expirationDate,
    memberName,
    memberTier,
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
          <div className="text-xs opacity-70">تاريخ الانتهاء</div>
          <div className="text-lg font-bold">{expirationDate}</div>
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
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <div className="text-left">
              <div className="text-xs opacity-70">اسم العضو</div>
              <div className="text-base font-bold">{memberName}</div>
            </div>
            <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center">
              <UserCircle className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Card footer stats */}
      <div className="px-5 py-4">
        <div className="flex justify-between items-start">
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">فئة العضوية</div>
            <div className="text-lg font-bold">{memberTier}</div>
          </div>
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">الحد المتاح</div>
            <div className="text-lg font-bold">8 زيارات</div>
          </div>
        </div>
      </div>
    </>
  );
};
