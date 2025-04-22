
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface BusinessStatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

const BusinessStatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = 'custom-primary' 
}: BusinessStatsCardProps) => {
  // Convert the color prop to CSS variables or direct color values
  const getColorValue = (colorName: string) => {
    if (colorName.startsWith('#')) {
      return colorName; // Already a hex color
    }
    return `var(--${colorName})`;
  };

  const iconColor = getColorValue(color);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="flex items-center p-6">
            <div 
              className="p-3 rounded-full ml-4" 
              style={{ backgroundColor: `${iconColor}10` }}
            >
              <Icon className="h-6 w-6" style={{ color: iconColor }} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</h3>
              {trend && (
                <p className={`text-xs mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive ? '↑' : '↓'} {trend.value}% منذ الشهر الماضي
                </p>
              )}
            </div>
          </div>
          <div 
            className="h-1 w-full" 
            style={{ 
              background: `linear-gradient(to left, ${iconColor}80, ${iconColor}20)` 
            }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessStatsCard;
