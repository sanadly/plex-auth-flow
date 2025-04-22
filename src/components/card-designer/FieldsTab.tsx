
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';
import { CardFieldProps } from './useCardDesigner';

interface FieldsTabProps {
  activeTab: string;
  cardFields: CardFieldProps[];
  toggleFieldVisibility: (id: string) => void;
  addNewField: () => void;
  removeField: (id: string) => void;
  updateFieldProperty: (id: string, property: string, value: boolean) => void;
  isEmployeeCard?: boolean;
}

export const FieldsTab: React.FC<FieldsTabProps> = ({
  activeTab,
  cardFields,
  toggleFieldVisibility,
  addNewField,
  removeField,
  updateFieldProperty,
  isEmployeeCard = false
}) => {
  return (
    <TabsContent value="fields" className="mt-0">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Button 
              size="sm"
              onClick={addNewField}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة حقل جديد
            </Button>
            <h4 className="text-lg font-medium text-right">
              {isEmployeeCard ? 'حقول الموظف' : 'حقول العضوية'}
            </h4>
          </div>
          
          <div className="space-y-6">
            {cardFields.map((field) => (
              <div 
                key={field.id} 
                className="border rounded-lg p-4 bg-card"
              >
                <div className="flex justify-between items-start mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeField(field.id)}
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 p-0 h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="text-right">
                    <h5 className="text-md font-medium">{field.name}</h5>
                    <p className="text-sm text-muted-foreground">{field.type}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="flex items-center space-x-2 space-x-reverse justify-end">
                    <Label htmlFor={`${field.id}-required`} className="ml-2">مطلوب</Label>
                    <Switch 
                      id={`${field.id}-required`}
                      checked={field.required}
                      onCheckedChange={(checked) => {
                        updateFieldProperty(field.id, 'required', checked);
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse justify-end">
                    <Label htmlFor={`${field.id}-unique`} className="ml-2">فريد</Label>
                    <Switch 
                      id={`${field.id}-unique`}
                      checked={field.unique}
                      onCheckedChange={(checked) => {
                        updateFieldProperty(field.id, 'unique', checked);
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse justify-end">
                    <Label htmlFor={`${field.id}-visible`} className="ml-2">ظاهر في البطاقة</Label>
                    <Switch 
                      id={`${field.id}-visible`}
                      checked={field.visible}
                      onCheckedChange={() => toggleFieldVisibility(field.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
