
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardPreview } from './CardPreview';
import { DesignTab } from './DesignTab';
import { FieldsTab } from './FieldsTab';
import { PreviewTab } from './PreviewTab';
import { useCardDesigner } from './useCardDesigner';
import { Button } from '@/components/ui/button';

interface CardDesignerProps {
  cardType?: string;
  onSave?: () => void;
  /** Determines if this is for employee management with roles (manager/worker) */
  isEmployeeCard?: boolean;
}

const CardDesigner: React.FC<CardDesignerProps> = ({ cardType, onSave, isEmployeeCard = false }) => {
  const {
    activeTab,
    setActiveTab,
    cardSettings,
    updateCardSettings,
    cardFields,
    toggleFieldVisibility,
    updateFieldProperty,
    addNewField,
    removeField,
    handleLogoUpload,
    handleBackgroundImageUpload,
    handleStampIconUpload,
    getCardStyle
  } = useCardDesigner(cardType);

  // Enhanced logging for card type changes with timestamp
  useEffect(() => {
    console.log("CardDesigner - Card type changed:", cardSettings.cardType, "at:", new Date().toISOString());
    
    // If this is an employee card, we can set specific default fields or settings
    if (isEmployeeCard) {
      console.log("Employee card detected - applying employee-specific settings");
      // We can customize employee card settings here if needed
    }
  }, [cardSettings.cardType, isEmployeeCard]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">
          {isEmployeeCard ? 'تصميم بطاقة الموظف' : 'تصميم بطاقة الولاء'}
        </h3>
        {onSave && (
          <Button onClick={onSave} variant="default">
            حفظ التصميم
          </Button>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="design">التصميم</TabsTrigger>
          <TabsTrigger value="fields">الحقول</TabsTrigger>
          <TabsTrigger value="preview">المعاينة</TabsTrigger>
        </TabsList>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <CardPreview 
              cardSettings={cardSettings} 
              getCardStyle={getCardStyle} 
              key={`card-preview-${cardSettings.cardType}`} // Enhanced key to force re-render
              isEmployeeCard={isEmployeeCard}
            />
          </div>
          
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <DesignTab 
              activeTab={activeTab}
              cardSettings={cardSettings}
              updateCardSettings={updateCardSettings}
              handleLogoUpload={handleLogoUpload}
              handleBackgroundImageUpload={handleBackgroundImageUpload}
              handleStampIconUpload={handleStampIconUpload}
              isEmployeeCard={isEmployeeCard}
            />
            
            <FieldsTab 
              activeTab={activeTab}
              cardFields={cardFields}
              toggleFieldVisibility={toggleFieldVisibility}
              updateFieldProperty={updateFieldProperty}
              addNewField={addNewField}
              removeField={removeField}
              isEmployeeCard={isEmployeeCard}
            />
            
            <PreviewTab 
              activeTab={activeTab}
              getCardStyle={getCardStyle}
              cardSettings={cardSettings}
              key={`preview-tab-${cardSettings.cardType}`} // Enhanced key to force re-render
              isEmployeeCard={isEmployeeCard}
            />
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default CardDesigner;
