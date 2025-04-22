import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Building2, Image, Settings2, Stamp, CreditCard, Award, BadgePercent, CalendarDays } from 'lucide-react';
import { CardSettings, CardType } from './useCardDesigner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface DesignTabProps {
  activeTab: string;
  cardSettings: CardSettings;
  updateCardSettings: (key: keyof CardSettings, value: any) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackgroundImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStampIconUpload: (type: 'completed' | 'incomplete', e: React.ChangeEvent<HTMLInputElement>) => void;
  isEmployeeCard?: boolean;
}

export const DesignTab: React.FC<DesignTabProps> = ({
  activeTab,
  cardSettings,
  updateCardSettings,
  handleLogoUpload,
  handleBackgroundImageUpload,
  handleStampIconUpload,
  isEmployeeCard = false
}) => {
  return (
    <TabsContent value="design" className="mt-0">
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-medium mb-6 text-right">خيارات التصميم</h4>
          
          <div className="space-y-8">
            <CardTypeSection 
              cardType={cardSettings.cardType}
              updateCardSettings={updateCardSettings}
            />
            
            <BasicInfoSection 
              businessName={cardSettings.businessName}
              programName={cardSettings.programName}
              updateCardSettings={updateCardSettings}
            />
            
            <ColorSection 
              cardSettings={cardSettings}
              updateCardSettings={updateCardSettings}
            />
            
            <LogoSection 
              cardLogo={cardSettings.cardLogo}
              cardBackgroundImage={cardSettings.cardBackgroundImage}
              handleLogoUpload={handleLogoUpload}
              handleBackgroundImageUpload={handleBackgroundImageUpload}
            />
            
            {cardSettings.cardType === 'stamps' && (
              <StampSettings 
                cardSettings={cardSettings}
                updateCardSettings={updateCardSettings}
                handleStampIconUpload={handleStampIconUpload}
              />
            )}
            
            {cardSettings.cardType === 'points' && (
              <PointsSettings 
                cardSettings={cardSettings}
                updateCardSettings={updateCardSettings}
              />
            )}
            
            {cardSettings.cardType === 'balance' && (
              <BalanceSettings 
                cardSettings={cardSettings}
                updateCardSettings={updateCardSettings}
              />
            )}
            
            {cardSettings.cardType === 'membership' && (
              <MembershipSettings 
                cardSettings={cardSettings}
                updateCardSettings={updateCardSettings}
              />
            )}
            
            {cardSettings.cardType === 'multipleVisit' && (
              <VisitsSettings 
                cardSettings={cardSettings}
                updateCardSettings={updateCardSettings}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

const CardTypeSection: React.FC<{
  cardType: CardType;
  updateCardSettings: (key: keyof CardSettings, value: any) => void;
}> = ({ cardType, updateCardSettings }) => (
  <div className="space-y-4">
    <h5 className="text-md font-medium mb-2 text-right">نوع البطاقة</h5>
    <div>
      <Label htmlFor="cardType" className="block mb-2">اختر نوع البطاقة</Label>
      <Select 
        value={cardType} 
        onValueChange={(value) => updateCardSettings('cardType', value)}
      >
        <SelectTrigger className="w-full" dir="rtl">
          <SelectValue placeholder="اختر نوع البطاقة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="stamps">بطاقة أختام</SelectItem>
          <SelectItem value="points">بطاقة نقاط</SelectItem>
          <SelectItem value="balance">بطاقة رصيد</SelectItem>
          <SelectItem value="membership">بطاقة عضوية</SelectItem>
          <SelectItem value="multipleVisit">بطاقة زيارات</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

const BasicInfoSection: React.FC<{
  businessName: string;
  programName: string;
  updateCardSettings: (key: keyof CardSettings, value: any) => void;
}> = ({ businessName, programName, updateCardSettings }) => (
  <div className="space-y-4">
    <h5 className="text-md font-medium mb-2 text-right">المعلومات الأساسية</h5>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="businessName" className="block mb-2">اسم المتجر</Label>
        <Input 
          id="businessName" 
          value={businessName} 
          onChange={(e) => updateCardSettings('businessName', e.target.value)} 
          dir="rtl"
        />
      </div>
      <div>
        <Label htmlFor="programName" className="block mb-2">عنوان البطاقة</Label>
        <Input 
          id="programName" 
          value={programName} 
          onChange={(e) => updateCardSettings('programName', e.target.value)} 
          dir="rtl"
        />
      </div>
    </div>
  </div>
);

const ColorSection: React.FC<{
  cardSettings: CardSettings;
  updateCardSettings: (key: keyof CardSettings, value: any) => void;
}> = ({ cardSettings, updateCardSettings }) => {
  // Predefined color options
  const colorOptions = [
    "#4fba65", "#8de19f", "#ff719A", "#accbee", "#ffc3a0", 
    "#e6b980", "#d299c2", "#ee9ca7", "#517fa4", "#FFE29F"
  ];

  return (
    <div className="space-y-4">
      <h5 className="text-md font-medium mb-2 text-right">ألوان البطاقة</h5>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EnhancedColorPicker 
          label="لون البطاقة"
          color={cardSettings.cardColor}
          colorOptions={colorOptions}
          onChange={(value) => updateCardSettings('cardColor', value)}
        />
        
        <EnhancedColorPicker 
          label="لون النص"
          color={cardSettings.cardTextColor}
          colorOptions={["#ffffff", "#000000", "#333333", "#555555", "#888888"]}
          onChange={(value) => updateCardSettings('cardTextColor', value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <EnhancedColorPicker 
          label="لون الحدود"
          color={cardSettings.cardBorderColor}
          colorOptions={["rgba(255,255,255,0.2)", "#ffffff", "#000000", "#f3f3f3", "#e2d1c3"]}
          onChange={(value) => updateCardSettings('cardBorderColor', value)}
        />
        
        <div>
          <Label className="block mb-2">سمك الحدود</Label>
          <div className="flex gap-4 items-center">
            <Slider
              value={[cardSettings.cardBorderWidth]}
              min={0}
              max={5}
              step={1}
              onValueChange={(value) => updateCardSettings('cardBorderWidth', value[0])}
              className="flex-grow"
            />
            <span className="w-8 text-center">{cardSettings.cardBorderWidth}px</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <Label className="block mb-2">انحناء الزوايا</Label>
          <div className="flex gap-4 items-center">
            <Slider
              value={[cardSettings.cardBorderRadius]}
              min={0}
              max={30}
              step={1}
              onValueChange={(value) => updateCardSettings('cardBorderRadius', value[0])}
              className="flex-grow"
            />
            <span className="w-8 text-center">{cardSettings.cardBorderRadius}px</span>
          </div>
        </div>
        
        <div>
          <Label className="block mb-2">محاذاة النص</Label>
          <Select 
            value={cardSettings.cardTextAlign} 
            onValueChange={(value) => updateCardSettings('cardTextAlign', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر محاذاة النص" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="right">يمين</SelectItem>
              <SelectItem value="left">يسار</SelectItem>
              <SelectItem value="center">وسط</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 space-x-reverse mt-4">
        <Switch 
          id="cardShadow"
          checked={cardSettings.cardShadow}
          onCheckedChange={(value) => updateCardSettings('cardShadow', value)}
        />
        <Label htmlFor="cardShadow">إظهار ظل للبطاقة</Label>
      </div>
    </div>
  );
};

const EnhancedColorPicker: React.FC<{
  label: string;
  color: string;
  colorOptions: string[];
  onChange: (value: string) => void;
}> = ({ label, color, colorOptions, onChange }) => {
  return (
    <div>
      <Label className="block mb-2">{label}</Label>
      <div className="flex items-center space-x-2 space-x-reverse">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-10 h-10 p-0 border-2"
              style={{ backgroundColor: color }}
            >
              <span className="sr-only">Pick a color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="flex flex-wrap gap-2 p-2">
              {colorOptions.map((clr) => (
                <button
                  key={clr}
                  className={`w-8 h-8 rounded border ${color === clr ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                  style={{ backgroundColor: clr }}
                  onClick={() => onChange(clr)}
                />
              ))}
            </div>
            <div className="px-4 py-2 border-t">
              <Label htmlFor="custom-color" className="text-xs">اختر لون مخصص</Label>
              <div className="flex mt-1">
                <Input 
                  id="custom-color"
                  type="color" 
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-8 h-8 p-0 mr-2"
                />
                <Input 
                  type="text" 
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Input 
          type="text" 
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
      </div>
    </div>
  );
};

const LogoSection: React.FC<{
  cardLogo: string | null;
  cardBackgroundImage: string | null;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackgroundImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ cardLogo, cardBackgroundImage, handleLogoUpload, handleBackgroundImageUpload }) => (
  <div className="space-y-4">
    <h5 className="text-md font-medium mb-2 text-right">شعار وخلفية البطاقة</h5>
    
    <div className="flex items-center gap-4 mb-6">
      {cardLogo && (
        <div className="w-16 h-16 rounded-md bg-white p-1 flex items-center justify-center border">
          <img 
            src={cardLogo} 
            alt="Card Logo" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
      
      <div className="flex-1">
        <label className="cursor-pointer">
          <input 
            type="file"
            id="cardLogo"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
          <Button 
            variant="outline" 
            className="w-full flex items-center"
            type="button"
            onClick={() => document.getElementById('cardLogo')?.click()}
          >
            <Upload className="h-4 w-4 ml-2" />
            {cardLogo ? 'تغيير الشعار' : 'تحميل شعار'}
          </Button>
        </label>
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      {cardBackgroundImage && (
        <div className="w-16 h-16 rounded-md bg-white p-1 flex items-center justify-center border">
          <img 
            src={cardBackgroundImage} 
            alt="Card Background" 
            className="max-w-full max-h-full object-cover rounded"
          />
        </div>
      )}
      
      <div className="flex-1">
        <label className="cursor-pointer">
          <input 
            type="file"
            id="cardBackgroundImage"
            accept="image/*"
            className="hidden"
            onChange={handleBackgroundImageUpload}
          />
          <Button 
            variant="outline" 
            className="w-full flex items-center"
            type="button"
            onClick={() => document.getElementById('cardBackgroundImage')?.click()}
          >
            <Image className="h-4 w-4 ml-2" />
            {cardBackgroundImage ? 'تغيير خلفية البطاقة' : 'تحميل خلفية البطاقة'}
          </Button>
        </label>
      </div>
    </div>
  </div>
);

const StampSettings: React.FC<{
  cardSettings: CardSettings;
  updateCardSettings: (key: keyof CardSettings, value: any) => void;
  handleStampIconUpload: (type: 'completed' | 'incomplete', e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ cardSettings, updateCardSettings, handleStampIconUpload }) => (
  <div className="space-y-4">
    <h5 className="text-md font-medium mb-2 text-right">
      <div className="flex items-center justify-between">
        إعدادات بطاقة الأختام
        <Stamp className="h-5 w-5" />
      </div>
    </h5>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <EnhancedColorPicker 
        label="لون خلفية الختم"
        color={cardSettings.stampBgColor}
        colorOptions={["#EAEAED", "#ffffff", "#f1f1f1", "#f3f3f3", "#fef9d7"]}
        onChange={(value) => updateCardSettings('stampBgColor', value)}
      />
      
      <EnhancedColorPicker 
        label="لون حدود الختم"
        color={cardSettings.stampBorderColor}
        colorOptions={["#AAAAAA", "#cccccc", "#999999", "#888888", "#dddddd"]}
        onChange={(value) => updateCardSettings('stampBorderColor', value)}
      />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="block mb-2">عدد الصفوف</Label>
        <div className="flex gap-4 items-center">
          <Slider
            value={[cardSettings.stampRows]}
            min={1}
            max={5}
            step={1}
            onValueChange={(value) => updateCardSettings('stampRows', value[0])}
            className="flex-grow"
          />
          <span className="w-8 text-center">{cardSettings.stampRows}</span>
        </div>
      </div>
      
      <div>
        <Label className="block mb-2">عدد الأعمدة</Label>
        <div className="flex gap-4 items-center">
          <Slider
            value={[cardSettings.stampColumns]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => updateCardSettings('stampColumns', value[0])}
            className="flex-grow"
          />
          <span className="w-8 text-center">{cardSettings.stampColumns}</span>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Completed Stamp Icon Upload */}
      <div>
        <Label className="block mb-2">أيقونة الختم المكتمل</Label>
        <div className="flex items-center gap-3">
          {cardSettings.stampIcons.completed && (
            <div className="w-10 h-10 rounded-md bg-white p-1 flex items-center justify-center border">
              <img 
                src={cardSettings.stampIcons.completed} 
                alt="Completed Stamp" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
          
          <div className="flex-1">
            <label className="cursor-pointer">
              <input 
                type="file"
                id="completedStampIcon"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleStampIconUpload('completed', e)}
              />
              <Button 
                variant="outline" 
                className="w-full flex items-center"
                type="button"
                onClick={() => document.getElementById('completedStampIcon')?.click()}
              >
                <Upload className="h-4 w-4 ml-2" />
                {cardSettings.stampIcons.completed ? 'تغيير' : 'تحميل أيقونة'}
              </Button>
            </label>
          </div>
        </div>
      </div>
      
      {/* Incomplete Stamp Icon Upload */}
      <div>
        <Label className="block mb-2">أيقونة الختم الفارغ</Label>
        <div className="flex items-center gap-3">
          {cardSettings.stampIcons.incomplete && (
            <div className="w-10 h-10 rounded-md bg-white p-1 flex items-center justify-center border">
              <img 
                src={cardSettings.stampIcons.incomplete} 
                alt="Incomplete Stamp" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
          
          <div className="flex-1">
            <label className="cursor-pointer">
              <input 
                type="file"
                id="incompleteStampIcon"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleStampIconUpload('incomplete', e)}
              />
              <Button 
                variant="outline" 
                className="w-full flex items-center"
                type="button"
                onClick={() => document.getElementById('incompleteStampIcon')?.click()}
              >
                <Upload className="h-4 w-4 ml-2" />
                {cardSettings.stampIcons.incomplete ? 'تغيير' : 'تحميل أيقونة'}
              </Button>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PointsSettings: React.FC<{
  cardSettings: CardSettings;
  updateCardSettings: (key: keyof CardSettings, value: any) => void;
}> = ({ cardSettings, updateCardSettings }) => (
  <div className="space-y-4">
    <h5 className="text-md font-medium mb-2 text-right">
      <div className="flex items-center justify-between">
        إعدادات بطاقة النقاط
        <Award className="h-5 w-5" />
      </div>
    </h5>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="pointsIcon" className="block mb-2">أيقونة النقاط</Label>
        <Input 
          id="pointsIcon" 
          value={cardSettings.pointsIcon} 
          onChange={(e) => updateCardSettings('pointsIcon', e.target.value)} 
          dir="rtl"
          placeholder="🏆"
        />
        <p className="text-xs text-gray-500 mt-1">يمكنك استخدام رموز الإيموجي 😀 🏆 ⭐</p>
      </div>
      
      <div>
        <Label htmlFor="pointsSample" className="block mb-2">نموذج عدد النقاط (للمعاينة)</Label>
        <Input 
          id="pointsSample" 
          type="number"
          value={cardSettings.points} 
          onChange={(e) => updateCardSettings('points', parseInt(e.target.value))} 
          dir="rtl"
        />
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="pointsPrefix" className="block mb-2">بادئة النقاط</Label>
        <Input 
          id="pointsPrefix" 
          value={cardSettings.pointsPrefix} 
          onChange={(e) => updateCardSettings('pointsPrefix', e.target.value)} 
          dir="rtl"
          placeholder="لديك "
        />
      </div>
      
      <div>
        <Label htmlFor="pointsSuffix" className="block mb-2">لاحقة النقاط</Label>
        <Input 
          id="pointsSuffix" 
          value={cardSettings.pointsSuffix} 
          onChange={(e) => updateCardSettings('pointsSuffix', e.target.value)} 
          dir="rtl"
          placeholder=" نقطة"
        />
      </div>
    </div>
  </div>
);

const BalanceSettings: React.FC<{
  cardSettings: CardSettings;
  updateCardSettings: (key: keyof CardSettings, value: any) => void;
}> = ({ cardSettings, updateCardSettings }) => (
  <div className="space-y-4">
    <h5 className="text-md font-medium mb-2 text-right">
      <div className="flex items-center justify-between">
        إعدادات بطاقة الرصيد
        <CreditCard className="h-5 w-5" />
      </div>
    </h5>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="currencySymbol" className="block mb-2">رمز العملة</Label>
        <Input 
          id="currencySymbol" 
          value={cardSettings.currencySymbol} 
          onChange={(e) => updateCardSettings('currencySymbol', e.target.value)} 
          dir="rtl"
          placeholder="$"
        />
      </div>
      
      <div>
        <Label htmlFor="currencyPosition" className="block mb-2">موقع رمز العملة</Label>
        <Select 
          value={cardSettings.currencyPosition} 
          onValueChange={(value: 'before' | 'after') => updateCardSettings('currencyPosition', value)}
        >
          <SelectTrigger className="w-full" dir="rtl">
            <SelectValue placeholder="اختر موقع رمز العملة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="before">قبل المبلغ (مثل $100)</SelectItem>
            <SelectItem value="after">بعد المبلغ (مثل 100$)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="balanceSample" className="block mb-2">نموذج الرصيد (للمعاينة)</Label>
        <Input 
          id="balanceSample" 
          type="number"
          value={cardSettings.balance} 
          onChange={(e) => updateCardSettings('balance', parseInt(e.target.value))} 
          dir="rtl"
        />
      </div>
    </div>
  </div>
);

const MembershipSettings: React.FC<{
  cardSettings: CardSettings;
  updateCardSettings: (key: keyof CardSettings, value: any) => void;
}> = ({ cardSettings, updateCardSettings }) => (
  <div className="space-y-4">
    <h5 className="text-md font-medium mb-2 text-right">
      <div className="flex items-center justify-between">
        إعدادات بطاقة العضوية
        <BadgePercent className="h-5 w-5" />
      </div>
    </h5>
    
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Label htmlFor="memberTier" className="block mb-2">اسم المستوى (للمعاينة)</Label>
        <Input 
          id="memberTier" 
          value={cardSettings.memberTier} 
          onChange={(e) => updateCardSettings('memberTier', e.target.value)} 
          dir="rtl"
        />
      </div>
      
      <div>
        <Label htmlFor="memberName" className="block mb-2">اسم العضو (للمعاينة)</Label>
        <Input 
          id="memberName" 
          value={cardSettings.memberName} 
          onChange={(e) => updateCardSettings('memberName', e.target.value)} 
          dir="rtl"
        />
      </div>
      
      <div className="flex items-center space-x-4 space-x-reverse mt-2">
        <Switch 
          id="showMembershipExpiry"
          checked={cardSettings.showMembershipExpiry}
          onCheckedChange={(value) => updateCardSettings('showMembershipExpiry', value)}
        />
        <Label htmlFor="showMembershipExpiry">إظهار تاريخ انتهاء العضوية</Label>
      </div>
      
      {cardSettings.showMembershipExpiry && (
        <div>
          <Label htmlFor="expirationDate" className="block mb-2">تاريخ الانتهاء (للمعاينة)</Label>
          <Input 
            id="expirationDate" 
            value={cardSettings.expirationDate} 
            onChange={(e) => updateCardSettings('expirationDate', e.target.value)} 
            dir="rtl"
          />
        </div>
      )}
    </div>
    
    {/* Tier colors would be implemented here, but would need a more complex UI component */}
    <div>
      <Label className="block mb-2">ألوان المستويات</Label>
      <p className="text-sm text-muted-foreground mb-2">تعديل ألوان المستويات المختلفة</p>
      
      {Object.entries(cardSettings.membershipTierColors).map(([tier, color]) => (
        <div key={tier} className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
          <span className="text-sm">{tier}:</span>
          <Input 
            type="color" 
            value={color}
            onChange={(e) => {
              const newColors = {...cardSettings.membershipTierColors, [tier]: e.target.value};
              updateCardSettings('membershipTierColors', newColors);
            }}
            className="w-10 h-6 p-0"
          />
        </div>
      ))}
    </div>
  </div>
);

const VisitsSettings: React.FC<{
  cardSettings: CardSettings;
  updateCardSettings: (key: keyof CardSettings, value: any) => void;
}> = ({ cardSettings, updateCardSettings }) => (
  <div className="space-y-4">
    <h5 className="text-md font-medium mb-2 text-right">
      <div className="flex items-center justify-between">
        إعدادات بطاقة الزيارات
        <CalendarDays className="h-5 w-5" />
      </div>
    </h5>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="visitIcon" className="block mb-2">أيقونة الزيارة</Label>
        <Input 
          id="visitIcon" 
          value={cardSettings.visitIcon} 
          onChange={(e) => updateCardSettings('visitIcon', e.target.value)} 
          dir="rtl"
          placeholder="✓"
        />
        <p className="text-xs text-gray-500 mt-1">يمكنك استخدام رموز الإيموجي ✓ ✅ 🗓️</p>
      </div>
      
      <div>
        <Label htmlFor="visitsTotal" className="block mb-2">إجمالي عدد الزيارات (للمعاينة)</Label>
        <Input 
          id="visitsTotal" 
          type="number"
          value={cardSettings.visitsTotal} 
          onChange={(e) => updateCardSettings('visitsTotal', parseInt(e.target.value))} 
          dir="rtl"
        />
      </div>
      
      <div>
        <Label htmlFor="visitsCount" className="block mb-2">عدد الزيارات المكتملة (للمعاينة)</Label>
        <Input 
          id="visitsCount" 
          type="number"
          value={cardSettings.visitsCount} 
          onChange={(e) => updateCardSettings('visitsCount', parseInt(e.target.value))} 
          dir="rtl"
        />
      </div>
    </div>
  </div>
);
