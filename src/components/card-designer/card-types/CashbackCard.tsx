
import React from 'react';
import { BadgePercent } from 'lucide-react';
import { CardTypeProps } from './CardTypeProps';

export const CashbackCard: React.FC<CardTypeProps> = ({ cardSettings }) => {
  const {
    businessName,
    cashbackPercentage = '5', // Default value if not provided
    cashbackStatus = 'Bronze', // Default value if not provided
    cardBackgroundImage
  } = cardSettings;

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="text-left font-bold text-xl">
          {businessName}
        </div>
        <div className="text-right">
          <div className="text-sm opacity-70">كاش باك</div>
          <div className="text-2xl font-bold">{cashbackPercentage}%</div>
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
        <div className="flex justify-center items-center relative z-10 p-4 h-40">
          <BadgePercent className="h-20 w-20 opacity-40" />
        </div>
      </div>
      
      <div className="flex justify-between items-start mt-4">
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">فئة الكاش باك</div>
          <div className="text-xl font-bold">{cashbackStatus}</div>
        </div>
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">المستوى التالي</div>
          <div className="text-xl font-bold">Silver</div>
        </div>
      </div>
    </>
  );
};
