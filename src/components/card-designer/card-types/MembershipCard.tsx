
import React from 'react';
import { UserCircle } from 'lucide-react';
import { CardTypeProps } from './CardTypeProps';

export const MembershipCard: React.FC<CardTypeProps> = ({ cardSettings }) => {
  const {
    businessName,
    expirationDate,
    memberName,
    memberTier,
    cardBackgroundImage
  } = cardSettings;

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="text-left font-bold text-xl">
          {businessName}
        </div>
        <div className="text-right">
          <div className="text-sm opacity-70">تاريخ الانتهاء</div>
          <div className="text-2xl font-bold">{expirationDate}</div>
        </div>
      </div>
      
      <div className="relative my-8">
        {cardBackgroundImage && (
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <img 
              src={cardBackgroundImage} 
              alt="Background" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}
        <div className="flex justify-between items-center relative z-10 p-4">
          <div className="text-left">
            <div className="text-sm opacity-70">اسم العضو</div>
            <div className="text-2xl font-bold">{memberName}</div>
          </div>
          <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center">
            <UserCircle className="h-16 w-16" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-start mt-4">
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">فئة العضوية</div>
          <div className="text-xl font-bold">{memberTier}</div>
        </div>
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">الحد المتاح</div>
          <div className="text-xl font-bold">8 زيارات</div>
        </div>
      </div>
    </>
  );
};
