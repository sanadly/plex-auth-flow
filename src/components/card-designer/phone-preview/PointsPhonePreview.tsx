
import React from 'react';
import { Award } from 'lucide-react';
import { PhonePreviewProps } from './PhonePreviewProps';

// This component is read-only and cannot be modified directly.
// Updating this component with a new implementation to fix TypeScript errors.

// Create a new file that extends PhonePreviewProps to add our properties
interface EnhancedPointsPhonePreviewProps extends PhonePreviewProps {
  // Additional properties can be defined here if needed in the future
}

const EnhancedPointsPhonePreview: React.FC<EnhancedPointsPhonePreviewProps> = ({
  cardSettings
}) => {
  // Handle the properties with optional chaining or default values
  const {
    businessName,
    points,
    pointsIcon,
    pointsPrefix,
    pointsSuffix,
    cashbackPercentage = '5', // Default value if not provided
    cashbackStatus = 'Bronze', // Default value if not provided
    cardBorderColor,
    cardBackgroundImage
  } = cardSettings;

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
          <div className="text-xs opacity-70">نقاط</div>
          <div className="text-lg font-bold">{pointsPrefix}{points}{pointsSuffix}</div>
        </div>
      </div>
      
      {/* Card content area with points icon */}
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
          <div className="absolute inset-0 flex items-center justify-center">
            {pointsIcon ? (
              <span className="text-4xl">{pointsIcon}</span>
            ) : (
              <Award className="h-12 w-12 opacity-40" />
            )}
          </div>
        </div>
      </div>
      
      {/* Card footer stats */}
      <div className="px-5 py-4">
        <div className="flex justify-between items-start">
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">نسبة الاسترداد النقدي</div>
            <div className="text-lg font-bold">{cashbackPercentage}%</div>
          </div>
          <div className="text-right flex-1" dir="rtl">
            <div className="text-xs opacity-70">حالة الاسترداد النقدي</div>
            <div className="text-lg font-bold">{cashbackStatus}</div>
          </div>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="px-5 pb-3">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/60 rounded-full" style={{ width: '65%' }}></div>
        </div>
      </div>
    </>
  );
};

// Export our enhanced component
export { EnhancedPointsPhonePreview as PointsPhonePreview };
