
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Building2, Phone, Mail, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const CustomerSignup = () => {
  const { businessSlug } = useParams();
  const { toast } = useToast();
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  });

  // This would normally fetch the business data from the API
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      // Mock business data - in a real app, this would come from an API
      setBusiness({
        name: `شركة ${businessSlug}`,
        logo: null,
        cardColor: '#4fba65',
        cardTextColor: '#ffffff',
        cardBorderColor: '#EAEAED',
        programType: 'points',
      });
      setIsLoading(false);
    }, 1000);
  }, [businessSlug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form (basic validation)
    if (!formData.fullName || !formData.phone) {
      toast({
        title: "خطأ في النموذج",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send the data to an API
    setTimeout(() => {
      setFormSubmitted(true);
      toast({
        title: "تم التسجيل بنجاح",
        description: "تم إضافتك إلى برنامج الولاء",
      });
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-primary mx-auto"></div>
          <p className="mt-4">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">الشركة غير موجودة</h2>
          <p>عذراً، لا يمكن العثور على الشركة المطلوبة.</p>
        </div>
      </div>
    );
  }

  if (formSubmitted) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 rounded-full p-3 mb-4">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-xl">تم التسجيل بنجاح!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">شكراً لك {formData.fullName} على الانضمام إلى برنامج الولاء الخاص بنا.</p>
            
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">يمكنك الآن إضافة بطاقة الولاء إلى محفظتك:</p>
              <div className="flex justify-center gap-4">
                {/* Updated Apple Wallet badge with new image */}
                <Button 
                  variant="outline" 
                  className="h-auto p-0 border-0 hover:bg-transparent"
                  onClick={() => window.open("#", "_blank")}
                >
                  <img 
                    src="/lovable-uploads/1f772473-ba6f-4b2b-a4b2-aac82f8e9deb.png" 
                    alt="Add to Apple Wallet"
                    className="h-10"
                  />
                </Button>
                
                {/* Updated Google Wallet badge with new image */}
                <Button 
                  variant="outline" 
                  className="h-auto p-0 border-0 hover:bg-transparent"
                  onClick={() => window.open("#", "_blank")}
                >
                  <img 
                    src="/lovable-uploads/101103b8-4ea1-4fb9-9e1e-4d6a479aa09a.png" 
                    alt="Add to Google Wallet"
                    className="h-10"
                  />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div 
            className="w-16 h-16 mx-auto rounded-full mb-4 flex items-center justify-center"
            style={{ backgroundColor: business.cardColor }}
          >
            {business.logo ? (
              <img src={business.logo} alt={business.name} className="h-10 w-10" />
            ) : (
              <Building2 className="h-8 w-8 text-white" />
            )}
          </div>
          <CardTitle className="text-xl">{business.name}</CardTitle>
          <p className="text-sm text-muted-foreground">التسجيل في برنامج الولاء</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="fullName">
                  الاسم الكامل*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input 
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="pr-10"
                    dir="rtl"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">
                  رقم الهاتف*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    className="pr-10"
                    dir="rtl"
                    placeholder="أدخل رقم هاتفك"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  البريد الإلكتروني (اختياري)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    className="pr-10"
                    dir="rtl"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-6" type="submit">
              تسجيل
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground">
          بالتسجيل، أنت توافق على شروط برنامج الولاء وسياسة الخصوصية.
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerSignup;
