
import React, { useEffect } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CardSettings } from './useCardDesigner';
import { CardContent as CardTypeContent } from './card-types/CardContent';

interface PreviewTabProps {
  activeTab: string;
  getCardStyle: () => React.CSSProperties;
  cardSettings: CardSettings;
  isEmployeeCard?: boolean;
}

export const PreviewTab: React.FC<PreviewTabProps> = ({
  activeTab,
  getCardStyle,
  cardSettings,
  isEmployeeCard = false
}) => {
  // Add effect to log card type changes
  useEffect(() => {
    console.log("PreviewTab - Card type changed to:", cardSettings.cardType);
    
    if (isEmployeeCard) {
      console.log("PreviewTab - Employee card mode active");
    }
  }, [cardSettings.cardType, isEmployeeCard]);

  return (
    <TabsContent value="preview" className="mt-0">
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-medium mb-6 text-right">
            {isEmployeeCard ? 'معاينة بطاقة الموظف' : 'معاينة البطاقة'}
          </h4>
          
          <div className="p-6 border rounded-lg bg-slate-50">
            <div className="relative perspective-1000 max-w-md mx-auto">
              <div 
                className="w-full rounded-xl shadow-lg flex flex-col justify-between p-6 min-h-72"
                style={{
                  ...getCardStyle(),
                  background: cardSettings.cardColor // Override to not include background image for entire card
                }}
              >
                <CardTypeContent 
                  cardSettings={cardSettings} 
                  getCardStyle={getCardStyle}
                  isEmployeeCard={isEmployeeCard}
                  key={`preview-tab-content-${cardSettings.cardType}`} // Enhanced key to force re-render
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button>
              {isEmployeeCard ? 'حفظ تصميم بطاقة الموظف' : 'حفظ تصميم البطاقة'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
