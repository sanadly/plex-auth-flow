
import React from 'react';
import { Medal, Trophy, Star } from 'lucide-react';
import { CardTypeProps } from './CardTypeProps';

export const TiersCard: React.FC<CardTypeProps> = ({ cardSettings }) => {
  const {
    memberName,
    memberTier,
    businessName,
    cardBackgroundImage,
    cardTextColor
  } = cardSettings;

  // Determine tier icon and color based on current tier
  const getTierIcon = () => {
    switch(memberTier.toLowerCase()) {
      case 'gold':
        return <Trophy className="h-16 w-16 text-amber-500" />;
      case 'platinum':
        return <Medal className="h-16 w-16 text-cyan-500" />;
      case 'diamond':
        return <Star className="h-16 w-16 text-purple-400" />;
      default: // Bronze/Silver
        return <Medal className="h-16 w-16 text-gray-400" />;
    }
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="text-left font-bold text-xl">
          {businessName}
        </div>
        <div className="text-right">
          <div className="text-sm opacity-70" style={{ color: cardTextColor }}>عضوية</div>
          <div className="text-2xl font-bold" style={{ color: cardTextColor }}>{memberTier}</div>
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
          <div className="flex flex-col items-center">
            {getTierIcon()}
            <div className="mt-4">
              <div className="text-center">
                <div className="text-sm opacity-70" style={{ color: cardTextColor }}>مرحبًا</div>
                <div className="text-2xl font-bold" style={{ color: cardTextColor }}>{memberName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-start mt-4">
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">المستوى التالي</div>
          <div className="text-xl font-bold">
            {memberTier === 'Bronze' ? 'Silver' : 
             memberTier === 'Silver' ? 'Gold' : 
             memberTier === 'Gold' ? 'Platinum' : 'المستوى الأعلى'}
          </div>
        </div>
        <div className="text-right flex-1">
          <div className="text-sm opacity-70">النقاط المطلوبة للترقية</div>
          <div className="text-xl font-bold">250</div>
        </div>
      </div>
    </>
  );
};
