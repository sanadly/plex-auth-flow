
import React from 'react';
import { CardTypeProps } from './CardTypeProps';
import { StampsCard } from './StampsCard';
import { PointsCard } from './PointsCard';
import { BalanceCard } from './BalanceCard';
import { MembershipCard } from './MembershipCard';
import { MultipleVisitCard } from './MultipleVisitCard';
import { DefaultCard } from './DefaultCard';

export const CardContent: React.FC<CardTypeProps> = (props) => {
  const { cardSettings } = props;
  
  // Add logging to debug card type changes
  console.log("CardContent rendering with card type:", cardSettings.cardType);
  
  // Simplified card type handling with consolidated functionality
  switch(cardSettings.cardType) {
    // Primary card types
    case 'stamps':
      return <StampsCard {...props} />;
    
    case 'points':
    // Legacy mappings for 'cashback' handled in useCardDesigner
      return <PointsCard {...props} />;
    
    case 'balance':
    // Legacy mappings for 'gift', 'discount', 'coupon' handled in useCardDesigner
      return <BalanceCard {...props} />;
    
    case 'membership':
    // Legacy mappings for 'tiers' handled in useCardDesigner
      return <MembershipCard {...props} />;
      
    case 'multipleVisit':
    // Legacy mappings for 'visits' handled in useCardDesigner
      return <MultipleVisitCard {...props} />;
    
    // Default fallback
    default:
      console.log("Falling back to DefaultCard for type:", cardSettings.cardType);
      return <DefaultCard {...props} />;
  }
};
