
import React, { useEffect } from 'react';
import { CardSettings } from './useCardDesigner';
import { PhoneFrame } from './phone-preview/PhoneFrame';
import { CardTypeContent } from './phone-preview/CardTypeContent';
import { BrandingFooter } from './phone-preview/BrandingFooter';

interface PhonePreviewProps {
  cardSettings: CardSettings;
  getCardStyle: () => React.CSSProperties;
  isEmployeeCard?: boolean;
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({
  cardSettings,
  getCardStyle,
  isEmployeeCard = false
}) => {
  // Enhanced logging to track card type changes with timestamp
  useEffect(() => {
    console.log("PhonePreview - Card type effect triggered:", cardSettings.cardType, "at:", new Date().toISOString());
    
    if (isEmployeeCard) {
      console.log("PhonePreview - Employee card mode active");
    }
  }, [cardSettings.cardType, isEmployeeCard]);
  
  console.log("PhonePreview rendering with card type:", cardSettings.cardType);
  
  return (
    <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-center">
      <PhoneFrame>
        {/* Card content */}
        <div className="flex-1 overflow-auto px-4 pt-4 pb-6 flex items-center justify-center">
          <div className="w-full max-w-[300px] mb-6 rounded-3xl overflow-hidden shadow-lg transform-gpu perspective-1000">
            <div 
              className="rounded-3xl overflow-hidden flex flex-col"
              style={{
                ...getCardStyle(),
                background: cardSettings.cardColor // Override the background to not include the image for the whole card
              }}
            >
              <CardTypeContent 
                cardSettings={cardSettings} 
                getCardStyle={getCardStyle}
                isEmployeeCard={isEmployeeCard}
                key={`card-content-${cardSettings.cardType}`} // Improved key to force re-render
              />
              
              <BrandingFooter />
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};
