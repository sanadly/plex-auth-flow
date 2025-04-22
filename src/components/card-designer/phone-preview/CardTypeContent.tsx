
import React, { useEffect } from 'react';
import { PhonePreviewProps } from './PhonePreviewProps';
import { StampsPhonePreview } from './StampsPhonePreview';
import { PointsPhonePreview } from './PointsPhonePreview';
import { BalancePhonePreview } from './BalancePhonePreview';
import { MembershipPhonePreview } from './MembershipPhonePreview';
import { MultipleVisitPhonePreview } from './MultipleVisitPhonePreview';
import { DefaultPhonePreview } from './DefaultPhonePreview';

export const CardTypeContent: React.FC<PhonePreviewProps> = (props) => {
  const { cardSettings } = props;
  
  // Enhanced logging for card type changes
  useEffect(() => {
    console.log("CardTypeContent - Card type changed to:", cardSettings.cardType, "at:", new Date().toISOString());
  }, [cardSettings.cardType]);
  
  // Determine which component to render based on cardType
  console.log("CardTypeContent - Rendering for card type:", cardSettings.cardType);
  
  // Simplified card type handling with consolidated functionality
  switch(cardSettings.cardType) {
    // Primary card types
    case 'stamps':
      return <StampsPhonePreview {...props} key="stamps-preview" />;
    
    case 'points':
    // Legacy mappings for 'cashback' handled in useCardDesigner
      return <PointsPhonePreview {...props} key="points-preview" />;
    
    case 'balance':
    // Legacy mappings for 'gift', 'discount', 'coupon' handled in useCardDesigner
      return <BalancePhonePreview {...props} key="balance-preview" />;
    
    case 'membership':
    // Legacy mappings for 'tiers' handled in useCardDesigner
      return <MembershipPhonePreview {...props} key="membership-preview" />;
      
    case 'multipleVisit':
    // Legacy mappings for 'visits' handled in useCardDesigner
      return <MultipleVisitPhonePreview {...props} key="multiple-visit-preview" />;
    
    // Default fallback with improved logging
    default:
      console.log("Falling back to DefaultPhonePreview for type:", cardSettings.cardType);
      return <DefaultPhonePreview {...props} key="default-preview" />;
  }
};
