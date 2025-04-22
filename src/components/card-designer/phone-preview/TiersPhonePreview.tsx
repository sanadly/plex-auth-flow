
import React from 'react';
import { Medal, Trophy, Star } from 'lucide-react';
import { PhonePreviewProps } from './PhonePreviewProps';

export const TiersPhonePreview: React.FC<PhonePreviewProps> = ({
  cardSettings
}) => {
  const {
    memberName,
    memberTier,
    businessName,
    cardBackgroundImage,
    cardBorderColor,
    cardTextColor
  } = cardSettings;

  // Determine tier icon and color based on current tier
  const getTierIcon = () => {
    switch(memberTier.toLowerCase()) {
      case 'gold':
        return <Trophy className="h-10 w-10 text-amber-500" />;
      case 'platinum':
        return <Medal className="h-10 w-10 text-cyan-500" />;
      case 'diamond':
        return <Star className="h-10 w-10 text-purple-400" />;
      default: // Bronze/Silver
        return <Medal className="h-10 w-10 text-gray-400" />;
    }
  };

  const getTierBackground = () => {
    switch(memberTier.toLowerCase()) {
      case 'gold':
        return 'bg-gradient-to-r from-amber-100 to-amber-50';
      case 'platinum':
        return 'bg-gradient-to-r from-slate-200 to-slate-50';
      case 'diamond':
        return 'bg-gradient-to-r from-purple-100 to-purple-50';
      default: // Bronze/Silver
        return 'bg-gradient-to-r from-gray-200 to-gray-50';
    }
  };

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
          <div className="text-xs opacity-70" style={{ color: cardTextColor }}>عضوية</div>
          <div className="text-lg font-bold" style={{ color: cardTextColor }}>{memberTier}</div>
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
          
          <div className={`absolute inset-0 flex items-center justify-center ${getTierBackground()}`}>
            <div className="flex items-center gap-3">
              {getTierIcon()}
              <div className="text-center">
                <div className="text-xs opacity-70" style={{ color: cardTextColor }}>مرحبًا</div>
                <div className="text-xl font-bold" style={{ color: cardTextColor }}>{memberName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card footer stats */}
      <div className="px-5 py-4">
        <div className="flex justify-between items-start">
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">المستوى التالي</div>
            <div className="text-lg font-bold">
              {memberTier === 'Bronze' ? 'Silver' : 
               memberTier === 'Silver' ? 'Gold' : 
               memberTier === 'Gold' ? 'Platinum' : 'المستوى الأعلى'}
            </div>
          </div>
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">النقاط المطلوبة للترقية</div>
            <div className="text-lg font-bold">250</div>
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
