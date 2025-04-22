
import React from 'react';
import { CreditCard, Clock } from 'lucide-react';
import { CardTypeProps } from './CardTypeProps';

export const MultipleVisitCard: React.FC<CardTypeProps> = ({ cardSettings }) => {
  const {
    businessName,
    programName,
    cardBackgroundImage,
    cardTextColor,
    visitsCount,
    visitsTotal
  } = cardSettings;

  // Calculate the visit progress
  const visitProgress = (visitsTotal / visitsCount) * 100;

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="text-left font-bold text-xl">
          {businessName}
        </div>
        <div className="text-right">
          <div className="text-sm opacity-70" style={{ color: cardTextColor }}>الزيارات</div>
          <div className="text-2xl font-bold" style={{ color: cardTextColor }}>{visitsTotal}/{visitsCount}</div>
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
        <div className="flex flex-col justify-center items-center relative z-10 p-4 h-40">
          <div className="w-full max-w-[90%] bg-white/70 rounded-full h-6 mb-4 overflow-hidden">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${visitProgress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between w-full max-w-[90%]">
            <div className="flex items-center">
              <Clock className="h-6 w-6 mr-2 text-indigo-500" />
              <span className="text-lg font-medium">زيارة {visitsTotal}</span>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-medium">الهدف: {visitsCount}</span>
              <CreditCard className="h-6 w-6 ml-2 text-indigo-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-start mt-4">
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">{programName}</div>
          <div className="text-xl font-bold">{businessName}</div>
        </div>
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">الزيارات المتبقية للمكافأة</div>
          <div className="text-xl font-bold">{visitsCount - visitsTotal}</div>
        </div>
      </div>
    </>
  );
};
