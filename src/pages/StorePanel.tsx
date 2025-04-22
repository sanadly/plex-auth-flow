
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { Store, QrCode, Gift, Clock, LogOut } from 'lucide-react';

const StorePanel = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-custom-background">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Store className="h-8 w-8 text-custom-primary ml-2" />
            <h1 className="text-xl font-bold text-custom-primary">لوحة المتجر</h1>
          </div>
          <Button 
            variant="ghost" 
            className="flex items-center text-text hover:text-custom-primary"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">مرحباً، {user?.username}</h2>
          <p className="text-muted-foreground">أنت مسجل الدخول كموظف متجر. قم بمسح بطاقات العملاء لإضافة النقاط أو استبدال المكافآت.</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-8 flex flex-col items-center justify-center">
          <QrCode className="h-16 w-16 text-custom-primary mb-4" />
          <h3 className="text-xl font-medium text-center">ماسح رمز QR</h3>
          <p className="text-muted-foreground text-center mb-6">مسح رمز QR الخاص بالعميل لمنح النقاط أو استبدال المكافآت</p>
          <Button className="bg-custom-primary hover:bg-custom-primary/90 w-full max-w-xs">
            بدء الماسح
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white shadow rounded-lg p-6 flex items-start space-x-4">
            <div>
              <h3 className="font-medium">استبدال المكافآت</h3>
              <p className="text-sm text-muted-foreground mt-1">معالجة عمليات استبدال المكافآت</p>
            </div>
            <div className="bg-custom-secondary/20 p-3 rounded-lg mr-4">
              <Gift className="h-6 w-6 text-custom-primary" />
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 flex items-start space-x-4">
            <div>
              <h3 className="font-medium">النشاط الأخير</h3>
              <p className="text-sm text-muted-foreground mt-1">عرض المعاملات الأخيرة</p>
            </div>
            <div className="bg-custom-secondary/20 p-3 rounded-lg mr-4">
              <Clock className="h-6 w-6 text-custom-primary" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StorePanel;
