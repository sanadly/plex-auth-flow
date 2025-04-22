
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Users, Building2, CreditCard, Eye, Power, UserPlus } from 'lucide-react';
import BusinessStatsCard from '../components/BusinessStatsCard';
import { toast } from 'sonner';

// Mock data - would normally come from API
const mockBusinesses = [
  { 
    id: 1, 
    name: 'مقهى السعادة', 
    owner: 'أحمد محمد', 
    status: 'active', 
    customersCount: 1245, 
    activeCards: 890, 
    totalPoints: 45600 
  },
  { 
    id: 2, 
    name: 'مطعم الشرق', 
    owner: 'سارة خالد', 
    status: 'active', 
    customersCount: 2150, 
    activeCards: 1670, 
    totalPoints: 78900 
  },
  { 
    id: 3, 
    name: 'متجر الأناقة', 
    owner: 'محمد علي', 
    status: 'suspended', 
    customersCount: 560, 
    activeCards: 320, 
    totalPoints: 22400 
  },
  { 
    id: 4, 
    name: 'صالون التجميل', 
    owner: 'نورة سعيد', 
    status: 'active', 
    customersCount: 875, 
    activeCards: 720, 
    totalPoints: 38500 
  },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [businesses, setBusinesses] = useState(mockBusinesses);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showStats, setShowStats] = useState(false);

  // Toggle business status (activate/suspend)
  const toggleBusinessStatus = (id) => {
    setBusinesses(businesses.map(business => {
      if (business.id === id) {
        const newStatus = business.status === 'active' ? 'suspended' : 'active';
        toast.success(`تم ${newStatus === 'active' ? 'تفعيل' : 'تعليق'} الشركة بنجاح`);
        return { ...business, status: newStatus };
      }
      return business;
    }));
  };

  // View business stats
  const viewBusinessStats = (business) => {
    setSelectedBusiness(business);
    setShowStats(true);
  };

  // Handler for creating a new business
  const handleCreateBusiness = () => {
    toast.info('سيتم إضافة نموذج إنشاء شركة جديدة قريباً');
  };

  // Handler for creating a new user
  const handleCreateUser = () => {
    toast.info('سيتم إضافة نموذج إنشاء مستخدم جديد قريباً');
  };

  return (
    <div className="min-h-screen bg-custom-background" dir="rtl">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-custom-primary ml-2" />
            <h1 className="text-xl font-bold text-custom-primary">لوحة تحكم المدير</h1>
          </div>
          <Button 
            variant="ghost" 
            className="flex items-center text-text hover:text-custom-primary"
            onClick={logout}
          >
            <Power className="h-5 w-5 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome card */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-2">مرحباً، {user?.username}</h2>
          <p className="text-muted-foreground">أنت مسجل الدخول كمدير عام. يمكنك إدارة الشركات والمستخدمين من هنا.</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Building2 className="h-5 w-5 ml-2 text-custom-primary" />
                الشركات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{businesses.length}</div>
              <p className="text-muted-foreground text-sm mt-1">
                {businesses.filter(b => b.status === 'active').length} نشطة
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users className="h-5 w-5 ml-2 text-custom-primary" />
                المستخدمين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">6</div>
              <p className="text-muted-foreground text-sm mt-1">
                4 مدراء شركات و 2 مشرفين
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <CreditCard className="h-5 w-5 ml-2 text-custom-primary" />
                الفواتير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5/7</div>
              <p className="text-muted-foreground text-sm mt-1">
                اشتراكات نشطة / إجمالي
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Business management section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">إدارة الشركات</h2>
            <Button onClick={handleCreateBusiness} className="flex items-center">
              <Building2 className="h-4 w-4 ml-2" />
              إضافة شركة جديدة
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم الشركة</TableHead>
                  <TableHead>المالك</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses.map(business => (
                  <TableRow key={business.id}>
                    <TableCell className="font-medium">{business.name}</TableCell>
                    <TableCell>{business.owner}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={business.status === 'active' ? 'default' : 'destructive'}
                        className={business.status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''}
                      >
                        {business.status === 'active' ? 'نشط' : 'معلق'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="ml-2"
                          onClick={() => viewBusinessStats(business)}
                        >
                          <Eye className="h-4 w-4 ml-1" />
                          عرض
                        </Button>
                        <Button 
                          variant={business.status === 'active' ? 'destructive' : 'default'} 
                          size="sm"
                          onClick={() => toggleBusinessStatus(business.id)}
                          className={business.status === 'active' ? '' : 'bg-green-500 hover:bg-green-600'}
                        >
                          <Power className="h-4 w-4 ml-1" />
                          {business.status === 'active' ? 'تعليق' : 'تفعيل'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Stats display section */}
        {showStats && selectedBusiness && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">إحصائيات {selectedBusiness.name}</h2>
              <Button 
                variant="outline" 
                onClick={() => setShowStats(false)}
              >
                إغلاق
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BusinessStatsCard 
                title="إجمالي العملاء"
                value={selectedBusiness.customersCount}
                icon={Users}
              />
              <BusinessStatsCard 
                title="البطاقات النشطة"
                value={selectedBusiness.activeCards}
                icon={CreditCard}
              />
              <BusinessStatsCard 
                title="إجمالي النقاط"
                value={selectedBusiness.totalPoints}
                icon={Shield}
              />
            </div>
          </div>
        )}

        {/* User management section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">إدارة المستخدمين</h2>
            <Button onClick={handleCreateUser} className="flex items-center">
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة مستخدم جديد
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم المستخدم</TableHead>
                  <TableHead>الدور</TableHead>
                  <TableHead>الشركة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">أحمد محمد</TableCell>
                  <TableCell>مدير شركة</TableCell>
                  <TableCell>مقهى السعادة</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500 hover:bg-green-600">نشط</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 ml-1" />
                      تفاصيل
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">سارة خالد</TableCell>
                  <TableCell>مدير شركة</TableCell>
                  <TableCell>مطعم الشرق</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500 hover:bg-green-600">نشط</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 ml-1" />
                      تفاصيل
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">فهد عبدالله</TableCell>
                  <TableCell>مدير شركة</TableCell>
                  <TableCell>متجر الأناقة</TableCell>
                  <TableCell>
                    <Badge variant="destructive">معلق</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 ml-1" />
                      تفاصيل
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
