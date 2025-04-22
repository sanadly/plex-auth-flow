
import { CardSettings } from '../useCardDesigner';

export interface CardTypeProps {
  cardSettings: CardSettings;
  getCardStyle: () => React.CSSProperties;
  isEmployeeCard?: boolean; // Add isEmployeeCard prop
}
