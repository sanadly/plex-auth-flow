
import React from 'react';
import { Ticket } from 'lucide-react';
import { CardTypeProps } from './CardTypeProps';

export const VisitsCard: React.FC<CardTypeProps> = ({ cardSettings }) => {
  const {
    businessName,
    visitsCount,
    visitsTotal,
    stampBgColor,
    stampBorderColor,
    cardTextColor,
    stampIcons,
    cardBackgroundImage
  } = cardSettings;

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="text-left font-bold text-xl">
          {businessName}
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
        <div className="grid grid-cols-5 gap-4 relative z-10 p-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i}
              className="aspect-square rounded-full flex items-center justify-center"
              style={{
                backgroundColor: stampBgColor,
                border: `1px solid ${stampBorderColor}`,
              }}
            >
              {stampIcons.completed ? (
                <img 
                  src={stampIcons.completed} 
                  alt="Visit" 
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <Ticket className="h-5 w-5" style={{ color: cardTextColor }} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-start mt-4">
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">العدد الحالي للزيارات</div>
          <div className="text-xl font-bold">{visitsCount}</div>
        </div>
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">العدد الكلي للزيارات</div>
          <div className="text-xl font-bold">{visitsTotal}</div>
        </div>
      </div>
    </>
  );
};
