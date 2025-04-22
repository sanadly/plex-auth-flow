
import React from 'react';
import { Building2, Check, Star } from 'lucide-react';
import { CardTypeProps } from './CardTypeProps';

export const DefaultCard: React.FC<CardTypeProps> = ({ cardSettings }) => {
  const {
    cardLogo,
    businessName,
    programName,
    stampBgColor,
    stampBorderColor,
    stampIcons,
    cardTextColor,
    cardBackgroundImage,
  } = cardSettings;

  return (
    <>
      <div className="flex justify-between items-start">
        <div className={`rounded-full h-16 w-16 flex items-center justify-center ${!cardLogo ? 'bg-white/20' : ''}`}>
          {cardLogo ? (
            <img src={cardLogo} alt="Logo" className="h-14 w-14 object-contain" />
          ) : (
            <Building2 className="h-8 w-8" />
          )}
        </div>
        <div className="text-right">
          <h3 className="font-bold text-2xl">{businessName}</h3>
          <p className="text-lg opacity-80">{programName}</p>
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div 
              key={i} 
              className="aspect-square rounded-full flex items-center justify-center"
              style={{
                backgroundColor: stampBgColor,
                border: `1px solid ${stampBorderColor}`,
              }}
            >
              {i <= 2 && (
                stampIcons.completed ? (
                  <img 
                    src={stampIcons.completed} 
                    alt="Completed" 
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <Check className="h-5 w-5" style={{ color: cardTextColor }} />
                )
              )}
              {i > 2 && stampIcons.incomplete && (
                <img 
                  src={stampIcons.incomplete} 
                  alt="Incomplete" 
                  className="w-6 h-6 object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-base mt-4 opacity-80 text-center">رقم العضوية: 1234 5678 9012</p>
      </div>
    </>
  );
};
