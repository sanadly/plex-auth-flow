
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CardSettings } from './useCardDesigner';
import { PhonePreview } from './PhonePreview';

interface CardPreviewProps {
  cardSettings: CardSettings;
  getCardStyle: () => React.CSSProperties;
  isEmployeeCard?: boolean;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  cardSettings,
  getCardStyle,
  isEmployeeCard = false
}) => {
  // Improve logging to track card type changes
  useEffect(() => {
    console.log("CardPreview - Current card type:", cardSettings.cardType);
    
    if (isEmployeeCard) {
      console.log("CardPreview - Employee card mode active");
    }
  }, [cardSettings.cardType, isEmployeeCard]);

  return (
    <Card>
      <CardContent className="p-6">
        <h4 className="text-lg font-medium mb-4 text-right">
          {isEmployeeCard ? 'معاينة بطاقة الموظف' : 'معاينة البطاقة'}
        </h4>
        <div className="flex flex-col gap-8">
          <PhonePreview 
            cardSettings={cardSettings} 
            getCardStyle={getCardStyle} 
            isEmployeeCard={isEmployeeCard}
            key={`phone-preview-${cardSettings.cardType}`} // Improved key to force re-render
          />
        </div>
      </CardContent>
    </Card>
  );
};
