
import React from 'react';
import { Check, Star } from 'lucide-react';
import { PhonePreviewProps } from './PhonePreviewProps';

export const StampsPhonePreview: React.FC<PhonePreviewProps> = ({
  cardSettings,
  getCardStyle
}) => {
  const {
    cardBorderColor,
    cardLogo,
    stampBgColor,
    stampBorderColor,
    stampIcons,
    cardTextColor,
    cardBackgroundImage,
    businessName,
    programName
  } = cardSettings;

  // Add console log to verify which component is rendering
  console.log("StampsPhonePreview rendering with businessName:", businessName);

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
          {businessName || 'اسم البطاقة'}
        </div>
        <div className="text-right">
          <div className="text-xs opacity-80 text-right" dir="rtl">
            الأختام
          </div>
          <div className="text-lg font-bold" dir="rtl">
            2/10
          </div>
        </div>
      </div>
      
      {/* Card content area with stamps */}
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
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="w-full h-full flex items-center justify-center py-4">
            <div className="grid grid-cols-5 gap-1 w-full max-w-[85%]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i}
                  className="aspect-square rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: stampBgColor,
                    border: `1px solid ${stampBorderColor}`,
                    transform: 'scale(0.8)'
                  }}
                >
                  {i < 2 ? (
                    stampIcons.completed ? (
                      <img 
                        src={stampIcons.completed} 
                        alt="Completed" 
                        className="w-4 h-4 object-contain"
                      />
                    ) : (
                      <Check className="w-3 h-3" style={{ color: cardTextColor }} />
                    )
                  ) : (
                    stampIcons.incomplete ? (
                      <img 
                        src={stampIcons.incomplete} 
                        alt="Incomplete" 
                        className="w-4 h-4 object-contain"
                      />
                    ) : (
                      <Star className="w-3 h-3" style={{ color: stampBorderColor }} />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Card footer stats */}
      <div className="px-5 py-4">
        <div className="flex justify-between items-start">
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">الأختام المتبقية للمكافأة</div>
            <div className="text-lg font-bold">8</div>
          </div>
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">المكافآت المتاحة</div>
            <div className="text-lg font-bold">0</div>
          </div>
        </div>
      </div>
    </>
  );
};
