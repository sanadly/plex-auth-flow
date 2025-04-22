
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  label: string;
  id: string;
  color: string;
  onChange: (value: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  id,
  color,
  onChange
}) => {
  return (
    <div>
      <Label htmlFor={id} className="block mb-2">{label}</Label>
      <div className="flex items-center space-x-2 space-x-reverse">
        <div 
          className="w-8 h-8 rounded border border-gray-300 ml-2"
          style={{ background: color }}
        ></div>
        <Input 
          id={id}
          type="text" 
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
