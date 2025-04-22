
import { CardSettings } from '../useCardDesigner';

export interface PhonePreviewProps {
  cardSettings: CardSettings;
  getCardStyle: () => React.CSSProperties;
  key?: string; // Add key prop to force re-render when card type changes
  isEmployeeCard?: boolean; // Add isEmployeeCard prop
}
