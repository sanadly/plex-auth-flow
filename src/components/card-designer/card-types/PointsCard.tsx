
import React from 'react';
import { CardTypeProps } from './CardTypeProps';

export const PointsCard: React.FC<CardTypeProps> = ({ cardSettings }) => {
  const {
    businessName,
    points,
    cardBackgroundImage,
    cashbackPercentage = '5', // Default value if not provided
    cashbackStatus = 'Bronze' // Default value if not provided
  } = cardSettings;

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="text-left font-bold text-xl">
          {businessName}
        </div>
        <div className="text-right">
          <div className="text-sm opacity-70">نقاط</div>
          <div className="text-2xl font-bold">{points}</div>
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
      </div>
      
      <div className="flex justify-between items-start mt-4">
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">نسبة الاسترداد النقدي</div>
          <div className="text-xl font-bold">{cashbackPercentage}%</div>
        </div>
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">حالة الاسترداد النقدي</div>
          <div className="text-xl font-bold">{cashbackStatus}</div>
        </div>
      </div>
    </>
  );
};
