
import { useState, useEffect } from 'react';

export interface CardFieldProps {
  id: string;
  name: string;
  type: string;
  required: boolean;
  unique: boolean;
  visible: boolean;
}

export interface StampIconsProps {
  completed: string | null;
  incomplete: string | null;
}

export type CardType = 'stamps' | 'points' | 'balance' | 'membership' | 'multipleVisit';

export interface CardSettings {
  cardType: CardType;
  // Common card settings
  cardColor: string;
  cardTextColor: string;
  cardBorderColor: string;
  cardBorderWidth: number;
  cardBorderRadius: number;
  cardOpacity: number;
  cardShadow: boolean;
  cardTextAlign: string;
  businessName: string;
  programName: string;
  cardLogo: string | null;
  cardBackgroundImage: string | null;
  // Stamp-specific settings
  stampBgColor: string;
  stampBorderColor: string;
  stampIcons: StampIconsProps;
  stampRows: number;
  stampColumns: number;
  // Points-specific settings
  pointsIcon: string;
  pointsPrefix: string;
  pointsSuffix: string;
  // Points/cashback data
  cashbackPercentage?: string;
  cashbackStatus?: string;
  // Balance-specific settings
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
  // Membership-specific settings
  membershipTierColors: Record<string, string>;
  showMembershipExpiry: boolean;
  // Visit-specific settings
  visitIcon: string;
  // Sample data for preview
  memberName: string;
  memberTier: string;
  points: number;
  balance: number;
  visitsCount: number;
  visitsTotal: number;
  expirationDate: string;
}

export const useCardDesigner = (initialCardType?: string) => {
  const [activeTab, setActiveTab] = useState<string>('design');
  const [cardSettings, setCardSettings] = useState<CardSettings>({
    cardType: (initialCardType as CardType) || 'stamps',
    // Common card settings
    cardColor: '#4fba65',
    cardTextColor: '#ffffff',
    cardBorderColor: 'rgba(255,255,255,0.2)',
    cardBorderWidth: 1,
    cardBorderRadius: 12,
    cardOpacity: 100,
    cardShadow: true,
    cardTextAlign: 'right',
    businessName: 'اسم المتجر',
    programName: 'بطاقة الولاء',
    cardLogo: null,
    cardBackgroundImage: null,
    // Stamp-specific settings
    stampBgColor: '#EAEAED',
    stampBorderColor: '#AAAAAA',
    stampIcons: {
      completed: null,
      incomplete: null
    },
    stampRows: 2,
    stampColumns: 5,
    // Points-specific settings
    pointsIcon: '🏆',
    pointsPrefix: '',
    pointsSuffix: ' نقطة',
    // Points/cashback data
    cashbackPercentage: '5',
    cashbackStatus: 'Bronze',
    // Balance-specific settings
    currencySymbol: '$',
    currencyPosition: 'before',
    // Membership-specific settings
    membershipTierColors: {
      'Bronze': '#CD7F32',
      'Silver': '#C0C0C0',
      'Gold': '#FFD700',
      'Platinum': '#E5E4E2'
    },
    showMembershipExpiry: true,
    // Visit-specific settings
    visitIcon: '✓',
    // Sample data for preview
    memberName: 'سالم',
    memberTier: 'Gold',
    points: 1000,
    balance: 500,
    visitsCount: 10,
    visitsTotal: 2,
    expirationDate: '31.12.2025'
  });

  useEffect(() => {
    if (initialCardType) {
      let mappedType = initialCardType;
      
      // Legacy type mappings
      if (initialCardType === 'cashback') mappedType = 'points';
      if (initialCardType === 'gift') mappedType = 'balance';
      if (initialCardType === 'tiers') mappedType = 'membership';
      if (initialCardType === 'discount') mappedType = 'balance';
      if (initialCardType === 'coupon') mappedType = 'balance';
      if (initialCardType === 'visits') mappedType = 'multipleVisit';
      
      if (mappedType !== cardSettings.cardType) {
        console.log(`Updating card type from external prop: ${initialCardType} → ${mappedType}`);
        setCardSettings(prev => ({
          ...prev,
          cardType: mappedType as CardType
        }));
      }
    }
  }, [initialCardType]);

  const [cardFields, setCardFields] = useState<CardFieldProps[]>([
    { id: 'fullName', name: 'الاسم الكامل', type: 'نص', required: true, unique: true, visible: true },
    { id: 'email', name: 'البريد الإلكتروني', type: 'بريد إلكتروني', required: false, unique: true, visible: true },
    { id: 'phone', name: 'رقم الهاتف', type: 'رقم هاتف', required: true, unique: true, visible: true },
    { id: 'address', name: 'العنوان', type: 'نص', required: false, unique: false, visible: false }
  ]);

  const updateCardSettings = (key: keyof CardSettings, value: any) => {
    console.log(`Updating card setting: ${key} to:`, value);
    setCardSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    console.log("Card type in useCardDesigner updated to:", cardSettings.cardType);
  }, [cardSettings.cardType]);

  const toggleFieldVisibility = (id: string) => {
    setCardFields(prev => 
      prev.map(field => 
        field.id === id ? { ...field, visible: !field.visible } : field
      )
    );
  };

  const updateFieldProperty = (id: string, property: string, value: boolean) => {
    setCardFields(prev => 
      prev.map(field => 
        field.id === id ? { ...field, [property]: value } : field
      )
    );
  };

  const addNewField = () => {
    const newField: CardFieldProps = {
      id: `field_${Date.now()}`,
      name: 'حقل جديد',
      type: 'نص',
      required: false,
      unique: false,
      visible: true
    };
    setCardFields([...cardFields, newField]);
  };

  const removeField = (id: string) => {
    setCardFields(prev => prev.filter(field => field.id !== id));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateCardSettings('cardLogo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateCardSettings('cardBackgroundImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStampIconUpload = (type: 'completed' | 'incomplete', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateCardSettings('stampIcons', {
          ...cardSettings.stampIcons,
          [type]: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getCardStyle = () => {
    return {
      background: cardSettings.cardBackgroundImage 
        ? `url(${cardSettings.cardBackgroundImage}) center/cover no-repeat, ${cardSettings.cardColor}`
        : cardSettings.cardColor,
      color: cardSettings.cardTextColor,
      borderRadius: `${cardSettings.cardBorderRadius}px`,
      border: `${cardSettings.cardBorderWidth}px solid ${cardSettings.cardBorderColor}`,
      opacity: cardSettings.cardOpacity / 100,
      boxShadow: cardSettings.cardShadow ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' : 'none',
      textAlign: cardSettings.cardTextAlign as any
    };
  };

  return {
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
  };
};
