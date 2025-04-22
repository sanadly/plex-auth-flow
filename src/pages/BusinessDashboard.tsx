import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { 
  Building2, Users, Gift, BarChart3, LogOut, Settings, 
  CreditCard, Bell, UserCog, Trash2, Upload, Tag,
  Sparkles, Ticket, Percent, Copy, QrCode, Share2, Link,
  ChevronRight, ListChecks, Shield, Palette, AlarmClock,
  SquareCheck, Zap, HelpCircle, PlusCircle, Star, Image,
  CircleDollarSign, BadgeDollarSign, Trophy, Award, Medal,
  Search, Filter, RefreshCw, MoreVertical, FileEdit, UserPlus,
  MessageSquare, ChevronUp, ChevronDown, UserCheck, UserX, Download,
  UserMinus, Mail, Phone, Calendar, Clock, Check, X, 
  ShieldCheck, ShieldAlert, UserCog2, BriefcaseBusiness, Loader2
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import BusinessStatsCard from '../components/BusinessStatsCard';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer, Legend, LineChart, Line, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import CardDesigner from '@/components/card-designer';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { User } from 'firebase/auth';

// Mock customer data for the customer management section
const customerData = [
  { 
    id: 1, 
    name: 'أحمد محمد', 
    phone: '0501234567', 
    email: 'ahmed@example.com', 
    dateJoined: '10/04/2025', 
    points: 1500, 
    tier: 'ذهبي', 
    status: 'نشط', 
    visits: 18 
  },
  { 
    id: 2, 
    name: 'سارة علي', 
    phone: '0557891234', 
    email: 'sara@example.com', 
    dateJoined: '05/04/2025', 
    points: 980, 
    tier: 'فضي', 
    status: 'نشط', 
    visits: 12 
  },
  { 
    id: 3, 
    name: 'محمد عبدالله', 
    phone: '0509876543', 
    email: 'mohamed@example.com', 
    dateJoined: '01/04/2025', 
    points: 2200, 
    tier: 'بلاتيني', 
    status: 'نشط', 
    visits: 25 
  },
  { 
    id: 4, 
    name: 'نورة سعد', 
    phone: '0554567891', 
    email: 'noura@example.com', 
    dateJoined: '29/03/2025', 
    points: 650, 
    tier: 'فضي', 
    status: 'نشط', 
    visits: 8 
  },
  { 
    id: 5, 
    name: 'خالد عمر', 
    phone: '0508765432', 
    email: 'khaled@example.com', 
    dateJoined: '25/03/2025', 
    points: 300, 
    tier: 'عادي', 
    status: 'غير نشط', 
    visits: 4 
  },
  { 
    id: 6, 
    name: 'ليلى فهد', 
    phone: '0553456789', 
    email: 'layla@example.com', 
    dateJoined: '20/03/2025', 
    points: 1200, 
    tier: 'ذهبي', 
    status: 'نشط', 
    visits: 16 
  },
  { 
    id: 7, 
    name: 'عمر حسن', 
    phone: '0505678912', 
    email: 'omar@example.com', 
    dateJoined: '15/03/2025', 
    points: 90, 
    tier: 'عادي', 
    status: 'غير نشط', 
    visits: 2 
  },
  { 
    id: 8, 
    name: 'فاطمة يوسف', 
    phone: '0551234567', 
    email: 'fatima@example.com', 
    dateJoined: '10/03/2025', 
    points: 750, 
    tier: 'فضي', 
    status: 'نشط', 
    visits: 9 
  },
  { 
    id: 9, 
    name: 'يوسف ابراهيم', 
    phone: '0507891234', 
    email: 'yousef@example.com', 
    dateJoined: '05/03/2025', 
    points: 420, 
    tier: 'عادي', 
    status: 'جديد', 
    visits: 5 
  },
  { 
    id: 10, 
    name: 'منى علي', 
    phone: '0558765432', 
    email: 'mona@example.com', 
    dateJoined: '01/03/2025', 
    points: 180, 
    tier: 'عادي', 
    status: 'جديد', 
    visits: 2 
  }
];

// Top customers for the dashboard widgets
const topCustomersByPoints = [
  { id: 3, name: 'محمد عبدالله', points: 2200, dateJoined: '01/04/2025' },
  { id: 1, name: 'أحمد محمد', points: 1500, dateJoined: '10/04/2025' },
  { id: 6, name: 'ليلى فهد', points: 1200, dateJoined: '20/03/2025' },
  { id: 2, name: 'سارة علي', points: 980, dateJoined: '05/04/2025' },
  { id: 8, name: 'فاطمة يوسف', points: 750, dateJoined: '10/03/2025' }
];

// Latest customers for the dashboard widgets
const latestCustomers = [
  { id: 1, name: 'أحمد محمد', dateJoined: '10/04/2025', status: 'نشط' },
  { id: 2, name: 'سارة علي', dateJoined: '05/04/2025', status: 'نشط' },
  { id: 3, name: 'محمد عبدالله', dateJoined: '01/04/2025', status: 'نشط' },
  { id: 4, name: 'نورة سعد', dateJoined: '29/03/2025', status: 'نشط' },
  { id: 5, name: 'خالد عمر', dateJoined: '25/03/2025', status: 'غير نشط' }
];

// Customer tier distribution for charts
const customerTierDistribution = [
  { name: 'عادي', value: 450, color: '#6B7280' },
  { name: 'فضي', value: 320, color: '#94A3B8' },
  { name: 'ذهبي', value: 280, color: '#F59E0B' },
  { name: 'بلاتيني', value: 200, color: '#0EA5E9' }
];

// Mock data for staff management
const staffData = [
  { 
    id: 1, 
    name: 'محمد علي', 
    email: 'mohamed@example.com', 
    phone: '0501234567', 
    role: 'مدير', 
    status: 'نشط',
    dateJoined: '15/01/2025',
    permissions: ['customers', 'loyalty', 'cards', 'notifications', 'reports'],
    lastActive: '11/04/2025'
  },
  { 
    id: 2, 
    name: 'أحمد خالد', 
    email: 'ahmed@example.com', 
    phone: '0509876543', 
    role: 'موظف', 
    status: 'نشط',
    dateJoined: '01/02/2025',
    permissions: ['customers'],
    lastActive: '10/04/2025'
  },
  { 
    id: 3, 
    name: 'فاطمة محمد', 
    email: 'fatima@example.com', 
    phone: '0551234567', 
    role: 'محاسب', 
    status: 'نشط',
    dateJoined: '10/02/2025',
    permissions: ['reports'],
    lastActive: '09/04/2025'
  },
  { 
    id: 4, 
    name: 'سارة أحمد', 
    email: 'sara@example.com', 
    phone: '0557654321', 
    role: 'مسؤول خدمة عملاء', 
    status: 'غير نشط',
    dateJoined: '15/02/2025',
    permissions: ['customers', 'notifications'],
    lastActive: '05/04/2025'
  },
  { 
    id: 5, 
    name: 'خالد عمر', 
    email: 'khaled@example.com', 
    phone: '0503456789', 
    role: 'مسوق', 
    status: 'نشط',
    dateJoined: '01/03/2025',
    permissions: ['loyalty', 'notifications'],
    lastActive: '11/04/2025'
  },
  { 
    id: 6, 
    name: 'نورة سالم', 
    email: 'noura@example.com', 
    phone: '0558765432', 
    role: 'مساعد إداري', 
    status: 'نشط',
    dateJoined: '15/03/2025',
    permissions: ['customers', 'reports'],
    lastActive: '11/04/2025'
  }
];

// Staff roles available
const staffRoles = [
  { id: 'manager', name: 'مدير' },
  { id: 'employee', name: 'موظف' },
  { id: 'accountant', name: 'محاسب' },
  { id: 'customer_service', name: 'مسؤول خدمة عملاء' },
  { id: 'marketer', name: 'مسوق' },
  { id: 'admin_assistant', name: 'مساعد إداري' }
];

// Staff permissions available
const availablePermissions = [
  { id: 'customers', name: 'إدارة العملاء', description: 'تسجيل وتعديل بيانات العملاء' },
  { id: 'loyalty', name: 'إدارة برنامج الولاء', description: 'تعديل إعدادات برنامج الولاء' },
  { id: 'cards', name: 'إدارة البطاقات', description: 'تصميم وإصدار بطاقات الولاء' },
  { id: 'notifications', name: 'إدارة الإشعارات', description: 'إرسال وجدولة الإشعارات' },
  { id: 'reports', name: 'التقارير', description: 'الوصول إلى التقارير والإحصائيات' }
];

// Helper function to generate initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

// Re-define interface for Staff Member data fetched from API
interface StaffMember {
  id: string; 
  username: string;
  email: string;
  role_id: string;
  status: 'active' | 'inactive';
  created_at: string;
  last_login: string | null;
  role?: string; // Optional properties added during processing
  permissions?: string[]; 
  dateJoined?: string; 
  lastActive?: string; 
}

// Define interface for Customer data
interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  dateJoined: string; // Keep as string for now, parse for sorting
  points: number;
  tier: string;
  status: string;
  visits: number;
}

// Define interface for Card Design Data (placeholder)
interface CardDesignData {
  cardType: string;
  colors: {
    primary: string;
    secondary: string;
  };
  // Add other relevant design properties
}

const BusinessDashboard = () => {
  const { user, firebaseUser, logout } = useAuth(); // Destructure firebaseUser
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('program');
  const [cardColor, setCardColor] = useState('#4fba65');
  const [cardTextColor, setCardTextColor] = useState('#1F1E1F');
  const [cardBorderColor, setCardBorderColor] = useState('#EAEAED');
  const [stampBgColor, setStampBgColor] = useState('#AAAAAA');
  const [stampsBackgroundColor, setStampsBackgroundColor] = useState('#1F1E1F');
  const [hasCustomizedCard, setHasCustomizedCard] = useState(false);
  const [businessSlug, setBusinessSlug] = useState('');
  const [setupProgress, setSetupProgress] = useState({
    programConfigured: false,
    cardDesigned: false,
    linkShared: false
  });
  const [stampedIconFile, setStampedIconFile] = useState(null);
  const [unstampedIconFile, setUnstampedIconFile] = useState(null);
  const [stampedIconPreview, setStampedIconPreview] = useState('');
  const [unstampedIconPreview, setUnstampedIconPreview] = useState('');
  const [backgroundImageFile, setBackgroundImageFile] = useState(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState('');
  const [cardType, setCardType] = useState('stamps');
  
  // Customer management state
  const [customerSearchText, setCustomerSearchText] = useState('');
  const [customerStatusFilter, setCustomerStatusFilter] = useState('all');
  const [customerTierFilter, setCustomerTierFilter] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [customersActiveTab, setCustomersActiveTab] = useState('all');
  const [sortField, setSortField] = useState('dateJoined');
  const [sortDirection, setSortDirection] = useState('desc');

  // Staff management state
  const [staffList, setStaffList] = useState<StaffMember[]>([]); // Use StaffMember[]
  const [rolesList, setRolesList] = useState<{ id: string; name: string }[]>([]); 
  const [isLoadingStaff, setIsLoadingStaff] = useState(false);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [staffSearchText, setStaffSearchText] = useState('');
  const [staffStatusFilter, setStaffStatusFilter] = useState('all');
  const [staffRoleFilter, setStaffRoleFilter] = useState('all'); 
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]); // Use string[]
  const [staffActiveTab, setStaffActiveTab] = useState('all');
  const [staffSortField, setStaffSortField] = useState('dateJoined');
  const [staffSortDirection, setStaffSortDirection] = useState('desc');
  const [isAddStaffDialogOpen, setIsAddStaffDialogOpen] = useState(false);
  const [newStaffMember, setNewStaffMember] = useState({
    name: '',
    email: '',
    phone: '', // Keep phone even if UI is commented, might be used later
    role: '', 
  });

  // Placeholder data definitions
  const businessStats = [
    { title: 'إجمالي العملاء', value: customerData.length.toString(), icon: Users, trend: { value: 5, isPositive: true } },
    { title: 'النقاط المكتسبة (آخر 30 يوم)', value: '12,500', icon: Gift, trend: { value: 8, isPositive: true } },
    { title: 'المكافآت المستردة (آخر 30 يوم)', value: '3,200', icon: Trophy, trend: { value: 2, isPositive: false } },
  ];

  const monthlyRegistrationsData = [
    { name: 'يناير', عملاء: 120 }, { name: 'فبراير', عملاء: 180 }, { name: 'مارس', عملاء: 250 },
    { name: 'أبريل', عملاء: 220 }, { name: 'مايو', عملاء: 300 }, { name: 'يونيو', عملاء: 280 },
  ];

  const pointsActivityData = [
    { name: 'يناير', اكتساب: 4000, استرداد: 2400 }, { name: 'فبراير', اكتساب: 3000, استرداد: 1398 },
    { name: 'مارس', اكتساب: 2000, استرداد: 9800 }, { name: 'أبريل', اكتساب: 2780, استرداد: 3908 },
    { name: 'مايو', اكتساب: 1890, استرداد: 4800 }, { name: 'يونيو', اكتساب: 2390, استرداد: 3800 },
  ];

  const quickActions = [
    { title: 'إضافة نقاط لعميل', description: 'إضافة نقاط يدوياً لحساب عميل محدد', icon: BadgeDollarSign, color: 'bg-green-500/80', action: () => console.log('Add points action') },
    { title: 'إرسال إشعار', description: 'إرسال إشعار مخصص لمجموعة من العملاء', icon: MessageSquare, color: 'bg-blue-500/80', action: () => console.log('Send notification action') },
    { title: 'عرض التقارير', description: 'الاطلاع على تقارير أداء البرنامج', icon: BarChart3, color: 'bg-amber-500/80', action: () => console.log('View reports action') },
    { title: 'إضافة موظف', description: 'دعوة موظف جديد للانضمام إلى النظام', icon: UserPlus, color: 'bg-purple-500/80', action: () => handleAddNewStaff() }, // Link to existing handler
  ];
  
  const setupSteps = [
    { 
      title: "ضبط إعدادات البرنامج", 
      description: "حدد نوع برنامج الولاء (نقاط، أختام، إلخ) وقواعده.", 
      completed: setupProgress.programConfigured, 
      icon: Settings, 
      action: () => setActiveTab('loyalty') 
    },
    { 
      title: "تصميم بطاقة الولاء", 
      description: "خصص شكل ومظهر بطاقة الولاء الرقمية لعلامتك التجارية.", 
      completed: setupProgress.cardDesigned, 
      icon: Palette, 
      action: () => setActiveTab('card') 
    },
    { 
      title: "مشاركة رابط التسجيل", 
      description: "شارك الرابط مع عملائك ليبدأوا بالتسجيل وجمع النقاط.", 
      completed: setupProgress.linkShared, 
      icon: Share2, 
      action: () => console.log('Share link action triggered') // Add a placeholder action
    },
  ];

  const form = useForm({
    defaultValues: {
      pointsExpiry: 365,
      maxCards: 0,
      autoEnroll: true,
      barcodeType: 'PDF417',
      programType: 'points',
      pointsPerCurrency: 10,
      pointsValueInCurrency: 0.1,
      minPointsRedemption: 100,
      stampsToReward: 10,
      stampRewardValue: 10,
      cashbackPercentage: 5,
      minCashbackRedemption: 20,
      tierLevels: 3,
      pointsForTier1: 100,
      pointsForTier2: 500,
      pointsForTier3: 1000,
      discountPercentage: 10,
      couponValidityDays: 30,
      giftCardMinValue: 10,
      giftCardMaxValue: 500
    }
  });

  // --- API Interaction Functions ---

  const fetchRoles = async () => {
    console.log("Attempting to fetch roles..."); // Log start
    try {
      console.log("Getting auth token...");
      const token = await firebaseUser?.getIdToken(); // Use firebaseUser
      if (!token) {
        console.error("Auth token not available.");
        throw new Error("Authentication required.");
      }
      console.log("Auth token retrieved. Fetching /api/roles...");

      const response = await fetch('/api/roles', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      console.log(`Fetch roles response status: ${response.status}`);

      // Check Content-Type before parsing JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text(); // Read response as text
        console.error("Received non-JSON response from /api/roles:", responseText); 
        throw new Error(`Expected JSON response, but received ${contentType || 'unknown content type'}. Check API endpoint or proxy configuration.`);
      }

      // Proceed only if Content-Type is application/json
      if (!response.ok) {
        let errorData: { message?: string } = {}; // Type errorData
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.error("Failed to parse error response JSON", parseError);
          errorData = { message: await response.text() }; // Use text as fallback
        }
        console.error("Failed to fetch roles:", errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`); // Access message safely
      }
      const data = await response.json();
      console.log("Successfully fetched roles:", data);

      // Ensure data matches expected format { id: string, name: string }[]
      if (Array.isArray(data) && data.every(item => typeof item.id === 'string' && typeof item.name === 'string')) {
        return data;
      } else {
        console.error("Received unexpected data format for roles:", data);
        throw new Error('Received unexpected data format for roles.');
      }

    } catch (error: unknown) { // Use unknown type
      console.error("Error in fetchRoles function:", error); // Log caught error
      const message = error instanceof Error ? error.message : "فشل في جلب الأدوار الوظيفية.";
      toast({
        title: "خطأ",
        description: message,
        variant: "destructive"
      });
      return []; // Return empty array on error
    }
  };

  const fetchStaff = async (): Promise<StaffMember[]> => {
    console.log("Attempting to fetch staff...");
    try {
      const token = await firebaseUser?.getIdToken(); // Use firebaseUser
      if (!token) {
          console.error("Auth token not available for fetching staff.");
          throw new Error("Authentication required.");
      }
      console.log("Fetching /api/users/staff...");

      const response = await fetch('/api/users/staff', { 
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log(`Fetch staff response status: ${response.status}`);
      if (!response.ok) {
         let errorData: { message?: string } = {}; // Type errorData
         try {
           errorData = await response.json();
         } catch (parseError) {
           errorData = { message: await response.text() };
         }
        console.error("Failed to fetch staff:", errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`); // Access message safely
      }
      const data: StaffMember[] = await response.json();
      console.log("Successfully fetched staff raw data:", data);
      // Map data
      const mappedData = data.map(staff => ({
        ...staff,
        role: rolesList.find(r => r.id === staff.role_id)?.name || staff.role_id,
        permissions: availablePermissions.map(p => p.id), // Placeholder
        dateJoined: new Date(staff.created_at).toLocaleDateString('en-GB'),
        lastActive: staff.last_login ? new Date(staff.last_login).toLocaleDateString('en-GB') : 'N/A'
      }));
       console.log("Mapped staff data:", mappedData);
       return mappedData;

    } catch (error: unknown) {
      console.error("Error in fetchStaff function:", error);
      const message = error instanceof Error ? error.message : "فشل في جلب قائمة الموظفين.";
      toast({
        title: "خطأ",
        description: message,
        variant: "destructive"
      });
      return [];
    }
  };

  const createStaff = async (staffData: { fullName: string; email: string; roleId: string }): Promise<StaffMember> => {
    console.log("Attempting to create staff:", staffData.email);
    try {
      const token = await firebaseUser?.getIdToken(); // Use firebaseUser
      if (!token) {
        console.error("Auth token not available for creating staff.");
        throw new Error("Authentication token not available.");
      }
       console.log("Posting to /api/users/staff...");

      const response = await fetch('/api/users/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(staffData),
      });
      console.log(`Create staff response status: ${response.status}`);

      if (!response.ok) {
        let errorData: { message?: string } = { message: `HTTP error! status: ${response.status}` }; // Default error, type errorData
        try {
            errorData = await response.json();
        } catch (e) { 
             console.warn("Could not parse JSON from error response in createStaff");
        } 
        console.error("API Error creating staff:", errorData);
        if (response.status === 409) {
          throw new Error(errorData.message || 'البريد الإلكتروني مسجل بالفعل.');
        } else if (response.status === 403) {
          throw new Error(errorData.message || 'ليس لديك الصلاحية لإضافة موظفين.');
        }
        throw new Error(errorData.message || 'فشل في إضافة الموظف.');
      }

      const newStaff: StaffMember = await response.json(); // Type the response
      console.log("Successfully created staff:", newStaff);
      return newStaff; 

    } catch (error: unknown) {
      console.error("Error in createStaff function:", error);
      // Rethrow the error so handleSubmitNewStaff can catch it and show toast
      throw error;
    }
  };

  // --- useEffect Hooks ---

  useEffect(() => {
    const getRoles = async () => {
      setIsLoadingRoles(true);
      const fetchedRoles = await fetchRoles();
      setRolesList(fetchedRoles);
      setIsLoadingRoles(false);
    };
    getRoles();
  }, []); // Fetch roles on mount

  useEffect(() => {
    const getStaff = async () => {
      if (rolesList.length > 0) { // Only fetch staff after roles are loaded
        setIsLoadingStaff(true);
        const fetchedStaff = await fetchStaff();
        setStaffList(fetchedStaff);
        setIsLoadingStaff(false);
      }
    };
    getStaff();
  }, [rolesList]); // Re-fetch staff if rolesList changes (though it shouldn't often)

  useEffect(() => {
    // Example: Update setup progress based on some criteria
    // This is just illustrative. You'd fetch this state from your backend.
    setSetupProgress({
      programConfigured: true, // Assume configured for now
      cardDesigned: hasCustomizedCard,
      linkShared: !!businessSlug // Assume link shared if slug exists
    });
    // Simulate fetching business slug
    setBusinessSlug('your-business-slug'); // Replace with actual fetch/state
  }, [hasCustomizedCard, businessSlug]);

  // --- Event Handlers ---

  // Customer management functions
  const handleSelectAllCustomers = (checked: boolean) => {
    if (checked) {
      const allIds = filteredCustomers.map(customer => customer.id);
      setSelectedCustomers(allIds);
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId: number, checked: boolean) => {
    if (checked) {
      setSelectedCustomers(prev => [...prev, customerId]);
    } else {
      setSelectedCustomers(prev => prev.filter(id => id !== customerId));
    }
  };

  const handleSort = (field: keyof Customer | 'name') => { // Allow 'name' specifically
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleDeleteSelectedCustomers = () => {
    console.log('Deleting selected customers:', selectedCustomers);
    toast({ title: "وظيفة قيد الإنشاء", description: "حذف العملاء المحددون." });
    // Add actual deletion logic here
  };
  
  const handleAddPoints = () => {
    console.log('Adding points to selected customers:', selectedCustomers);
    toast({ title: "وظيفة قيد الإنشاء", description: "إضافة نقاط للعملاء المحددون." });
    // Add logic to open a dialog or perform action
  };
  
  const handleSendMessageToSelected = () => {
    console.log('Sending message to selected customers:', selectedCustomers);
    toast({ title: "وظيفة قيد الإنشاء", description: "إرسال رسالة للعملاء المحددون." });
    // Add logic to open a message dialog
  };
  
  const handleAddNewCustomer = () => {
    console.log('Add new customer action triggered');
    toast({ title: "وظيفة قيد الإنشاء", description: "إضافة عميل جديد." });
    // Add logic to open 'Add Customer' modal/dialog
  };

  const handleExportCustomers = () => {
    console.log('Export customers action triggered');
    toast({ title: "وظيفة قيد الإنشاء", description: "تصدير بيانات العملاء." });
    // Add logic for data export (e.g., CSV)
  };

  // Card Designer Handler
  const handleSaveCardDesign = (designData: CardDesignData) => { // Use defined interface
      console.log('Saving card design:', designData);
      setHasCustomizedCard(true); // Example: set state on save
      toast({ title: "تم الحفظ", description: "تم حفظ تصميم البطاقة بنجاح." });
      // Add actual save logic to backend here
  };

  // Signup Link Handler
  const copySignupLink = () => {
    const link = `${window.location.origin}/signup/${businessSlug}`;
    navigator.clipboard.writeText(link).then(() => {
      toast({ title: "تم النسخ", description: "تم نسخ رابط التسجيل بنجاح." });
    }).catch(err => {
      console.error('Failed to copy link: ', err);
      toast({ title: "خطأ", description: "فشل نسخ الرابط.", variant: "destructive" });
    });
  };

  // Staff management functions
  const handleSelectAllStaff = (checked: boolean) => {
    if (checked) {
      const allIds = filteredStaff.map(staff => staff.id); // string IDs
      setSelectedStaff(allIds);
    } else {
      setSelectedStaff([]);
    }
  };

  const handleSelectStaff = (staffId: string, checked: boolean) => { // string ID
    if (checked) {
      setSelectedStaff(prev => [...prev, staffId]);
    } else {
      setSelectedStaff(prev => prev.filter(id => id !== staffId));
    }
  };

  const handleStaffSort = (field: keyof StaffMember | 'name' | 'role' | 'dateJoined' | 'lastActive') => { // Specify sortable fields
    if (staffSortField === field) {
      setStaffSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setStaffSortField(field);
      setStaffSortDirection('desc'); // Default to desc for new field
    }
  };
  
  const handleDeleteSelectedStaff = () => {
    console.log('Deleting selected staff:', selectedStaff);
    toast({ title: "وظيفة قيد الإنشاء", description: "حذف الموظفين المحددين." });
    // Add actual deletion logic here, call API, then refresh list
    // Example: deleteStaffMutation.mutate(selectedStaff);
    setSelectedStaff([]); // Clear selection after initiating delete
  };

  const handleAddNewStaff = () => {
    setIsAddStaffDialogOpen(true);
  };

  const handleSubmitNewStaff = async () => {
    // Basic Validation
    if (!newStaffMember.name || !newStaffMember.email || !newStaffMember.role) {
      toast({ title: "خطأ", description: "يرجى ملء الاسم والبريد الإلكتروني واختيار الدور.", variant: "destructive" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newStaffMember.email)) {
        toast({ title: "خطأ", description: "الرجاء إدخال بريد إلكتروني صحيح.", variant: "destructive" });
        return;
    }

    // Construct payload from state
    const staffPayload = {
      fullName: newStaffMember.name,
      email: newStaffMember.email,
      roleId: newStaffMember.role, 
    };

    setIsLoadingStaff(true); 
    try {
      // Pass the correct payload
      const createdStaff = await createStaff(staffPayload);
      toast({
        title: "تمت الإضافة بنجاح",
        description: `تم إرسال دعوة إلى ${createdStaff.email} للانضمام.`,
      });
      setIsAddStaffDialogOpen(false);
      setNewStaffMember({ 
        name: '',
        email: '',
        phone: '',
        role: '', 
      });
      // Refresh staff list
      const updatedStaffList = await fetchStaff(); 
      setStaffList(updatedStaffList);

    } catch (error: unknown) { 
       const message = error instanceof Error ? error.message : "حدث خطأ أثناء إضافة الموظف.";
       console.error("Error submitting new staff:", error); 
      toast({
        title: "فشل الإنشاء",
        description: message, 
        variant: "destructive", 
      });
    } finally {
        setIsLoadingStaff(false); 
    }
  };
  
  // --- Filtering and Sorting Logic ---

  // Filter and sort customers
  const filteredCustomers = customerData.filter((customer: Customer) => {
    // Text search
    const searchLower = customerSearchText.toLowerCase();
    const nameMatch = customer.name.toLowerCase().includes(searchLower);
    const phoneMatch = customer.phone.includes(customerSearchText); // phone doesn't need lowercase
    const emailMatch = customer.email.toLowerCase().includes(searchLower);
    const textMatch = nameMatch || phoneMatch || emailMatch;
  
    // Status filter
    const statusMatch = customerStatusFilter === 'all' || customer.status === customerStatusFilter;
  
    // Tier filter
    const tierMatch = customerTierFilter === 'all' || customer.tier === customerTierFilter;
  
    // Tab filter
    let tabMatch = true;
    if (customersActiveTab === 'active') {
      tabMatch = customer.status === 'نشط';
    } else if (customersActiveTab === 'inactive') {
      tabMatch = customer.status === 'غير نشط';
    } else if (customersActiveTab === 'new') {
        tabMatch = customer.status === 'جديد';
    }
  
    return textMatch && statusMatch && tierMatch && tabMatch;
  
  }).sort((a, b) => {
    const field = sortField as keyof Customer; // Type assertion
    const direction = sortDirection === 'asc' ? 1 : -1;

    let valA = a[field];
    let valB = b[field];

    // Handle date sorting specifically
    if (field === 'dateJoined') {
      // Assuming 'DD/MM/YYYY' format, convert to comparable format (e.g., YYYYMMDD) or Date object
      const parseDate = (dateStr: string) => {
        const parts = dateStr.split('/');
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      };
      valA = parseDate(a.dateJoined).getTime();
      valB = parseDate(b.dateJoined).getTime();
    }
    
    // Handle string comparison
    if (typeof valA === 'string' && typeof valB === 'string') {
      return valA.localeCompare(valB) * direction;
    }

    // Handle number comparison
    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA - valB) * direction;
    }

    return 0; // Default no sort if types mismatch or field not found
  });

  // Filter and sort staff
  const filteredStaff = staffList.filter(staff => {
    // Text search (adjust fields based on staffList structure)
    const nameMatch = staff.username?.toLowerCase().includes(staffSearchText.toLowerCase()) || false;
    const emailMatch = staff.email?.toLowerCase().includes(staffSearchText.toLowerCase()) || false;
    const textMatch = nameMatch || emailMatch;

    // Status filter (adjust based on staffList structure)
    const statusMatch = staffStatusFilter === 'all' || staff.status === staffStatusFilter;

    // Role filter (use role NAME for filtering if available, otherwise ID)
    const roleName = rolesList.find(r => r.id === staff.role_id)?.name;
    const roleMatch = staffRoleFilter === 'all' || roleName === staffRoleFilter;
    
    // Tab filter
    let tabMatch = true;
    if (staffActiveTab === 'active') {
      tabMatch = staff.status === 'active'; // Use 'active' from backend
    } else if (staffActiveTab === 'inactive') {
      tabMatch = staff.status === 'inactive'; // Use 'inactive' from backend
    }
    
    return textMatch && statusMatch && roleMatch && tabMatch;

  }).sort((a, b): number => { // Added return type number
    // Handle sorting (adjust fields based on staffList structure)
    if (staffSortField === 'name') {
      return staffSortDirection === 'asc' 
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username);
    } else if (staffSortField === 'role') {
      const roleA = rolesList.find(r => r.id === a.role_id)?.name || a.role_id;
      const roleB = rolesList.find(r => r.id === b.role_id)?.name || b.role_id;
      return staffSortDirection === 'asc'
        ? roleA.localeCompare(roleB)
        : roleB.localeCompare(roleA);
    } else if (staffSortField === 'dateJoined') { // Assuming 'created_at' from backend
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return staffSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (staffSortField === 'lastActive') { // Assuming 'last_login' from backend
      const dateA = a.last_login ? new Date(a.last_login).getTime() : 0;
      const dateB = b.last_login ? new Date(b.last_login).getTime() : 0;
      return staffSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-custom-background">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-custom-primary ml-2" />
            <h1 className="text-xl font-bold text-custom-primary">لوحة تحكم الشركة</h1>
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
          <p className="text-muted-foreground">أنت مسجل الدخول كمالك شركة. قم بإدارة برنامج الولاء والعملاء.</p>
          
          {(!setupProgress.programConfigured || !setupProgress.cardDesigned || !setupProgress.linkShared) && (
            <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-emerald-100 shadow-sm" dir="rtl">
              <div className="flex items-center mb-4">
                <HelpCircle className="h-5 w-5 text-custom-primary ml-3" />
                <h3 className="font-medium text-custom-primary text-lg">خطوات إعداد برنامج الولاء</h3>
              </div>
              <div className="space-y-4">
                {setupSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center p-3 rounded-md transition-all duration-200 ${
                      step.completed 
                        ? 'bg-green-50/80 border border-green-100 shadow-sm' 
                        : 'bg-white/90 border border-gray-200 hover:border-custom-primary/30 hover:bg-white'
                    }`}
                  >
                    <div className={`p-2 rounded-full mr-3 ${step.completed ? 'bg-green-500' : 'bg-custom-primary/20'}`}>
                      {step.completed ? (
                        <SquareCheck className="h-5 w-5 text-white" />
                      ) : (
                        <step.icon className="h-5 w-5 text-custom-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-green-700' : 'text-gray-800'}`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant={step.completed ? "outline" : "default"} 
                      onClick={step.action}
                      className={step.completed ? "bg-white text-green-600 hover:bg-green-50 border-green-200" : ""}
                    >
                      {step.completed ? 'تم' : 'ابدأ'}
                      <ChevronRight className="h-4 w-4 mr-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {hasCustomizedCard && (
            <div className="mt-4 p-4 bg-custom-primary/10 rounded-lg border border-custom-primary/20">
              <div className="flex items-center mb-2">
                <Link className="h-5 w-5 text-custom-primary ml-2" />
                <h3 className="font-medium text-custom-primary">رابط تسجيل العملاء</h3>
              </div>
              <p className="text-sm mb-3">شارك هذا الرابط مع عملائك للتسجيل في برنامج الولاء الخاص بك:</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 bg-white rounded border px-3 py-2 text-sm flex items-center justify-between">
                  <span className="truncate">{window.location.origin}/signup/{businessSlug}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center" onClick={copySignupLink}>
                    <Copy className="h-4 w-4 ml-1" />
                    نسخ الرابط
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <QrCode className="h-4 w-4 ml-1" />
                    عرض QR
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Share2 className="h-4 w-4 ml-1" />
                    مشاركة
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {businessStats.map((stat, index) => (
            <BusinessStatsCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="flex border-b overflow-x-auto">
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-custom-primary border-b-2 border-custom-primary' : 'text-muted-foreground hover:text-text'}`}
              onClick={() => setActiveTab('overview')}
            >
              نظرة عامة
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'loyalty' ? 'text-custom-primary border-b-2 border-custom-primary' : 'text-muted-foreground hover:text-text'}`}
              onClick={() => setActiveTab('loyalty')}
            >
              برنامج الولاء
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'card' ? 'text-custom-primary border-b-2 border-custom-primary' : 'text-muted-foreground hover:text-text'}`}
              onClick={() => setActiveTab('card')}
            >
              تصميم البطاقة
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'customers' ? 'text-custom-primary border-b-2 border-custom-primary' : 'text-muted-foreground hover:text-text'}`}
              onClick={() => setActiveTab('customers')}
            >
              العملاء
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'notifications' ? 'text-custom-primary border-b-2 border-custom-primary' : 'text-muted-foreground hover:text-text'}`}
              onClick={() => setActiveTab('notifications')}
            >
              الإشعارات
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'staff' ? 'text-custom-primary border-b-2 border-custom-primary' : 'text-muted-foreground hover:text-text'}`}
              onClick={() => setActiveTab('staff')}
            >
              الموظفين
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-medium mb-4">نظرة عامة على برنامج الولاء</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="border cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className={`p-3 rounded-full ${action.color} mb-4`}>
                          <action.icon className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-medium mb-1">{action.title}</h4>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>تسجيلات العملاء</CardTitle>
                      <CardDescription>إجمالي العملاء المسجلين شهرياً</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ChartContainer
                          config={{
                            عملاء: {
                              theme: {
                                light: "#4fba65",
                                dark: "#4fba65",
                              },
                            },
                          }}
                        >
                          <BarChart data={monthlyRegistrationsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip
                              content={<ChartTooltipContent />}
                            />
                            <Bar dataKey="عملاء" fill="#4fba65" />
                          </BarChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>نشاط النقاط</CardTitle>
                      <CardDescription>اكتساب واسترداد النقاط عبر الزمن</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ChartContainer
                          config={{
                            اكتساب: {
                              theme: {
                                light: "#4fba65",
                                dark: "#4fba65",
                              },
                            },
                            استرداد: {
                              theme: {
                                light: "#f59e0b",
                                dark: "#f59e0b",
                              },
                            },
                          }}
                        >
                          <LineChart data={pointsActivityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip
                              content={<ChartTooltipContent />}
                            />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="اكتساب" 
                              stroke="#4fba65" 
                              activeDot={{ r: 8 }} 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="استرداد" 
                              stroke="#f59e0b" 
                            />
                          </LineChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-sm">معدل الاسترداد</h4>
                        <Percent className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="text-2xl font-bold">76%</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        نسبة العملاء الذين استردوا مكافآت هذا الشهر
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-sm">متوسط نقاط العميل</h4>
                        <Zap className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="text-2xl font-bold">126</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        متوسط عدد النقاط لكل عميل نشط
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-sm">معدل النمو</h4>
                        <BarChart3 className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold">+18%</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        نمو عدد العملاء مقارنة بالشهر الماضي
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {activeTab === 'customers' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h3 className="text-lg font-medium mb-2 md:mb-0">إدارة العملاء</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="flex items-center" onClick={handleAddNewCustomer}>
                      <UserPlus className="h-4 w-4 ml-1" />
                      إضافة عميل
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center" onClick={handleExportCustomers}>
                      <Download className="h-4 w-4 ml-1" />
                      تصدير البيانات
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث عن عميل..."
                        value={customerSearchText}
                        onChange={(e) => setCustomerSearchText(e.target.value)}
                        className="pl-3 pr-9 bg-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select 
                        value={customerStatusFilter} 
                        onValueChange={setCustomerStatusFilter}
                      >
                        <SelectTrigger className="w-[140px] bg-white">
                          <SelectValue placeholder="الحالة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع الحالات</SelectItem>
                          <SelectItem value="نشط">نشط</SelectItem>
                          <SelectItem value="غير نشط">غير نشط</SelectItem>
                          <SelectItem value="جديد">جديد</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select 
                        value={customerTierFilter} 
                        onValueChange={setCustomerTierFilter}
                      >
                        <SelectTrigger className="w-[140px] bg-white">
                          <SelectValue placeholder="المستوى" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع المستويات</SelectItem>
                          <SelectItem value="عادي">عادي</SelectItem>
                          <SelectItem value="فضي">فضي</SelectItem>
                          <SelectItem value="ذهبي">ذهبي</SelectItem>
                          <SelectItem value="بلاتيني">بلاتيني</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" className="bg-white">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="bg-white" onClick={() => {
                        setCustomerSearchText('');
                        setCustomerStatusFilter('all');
                        setCustomerTierFilter('all');
                      }}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Tabs value={customersActiveTab} onValueChange={setCustomersActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">جميع العملاء ({customerData.length})</TabsTrigger>
                      <TabsTrigger value="active">العملاء النشطين ({customerData.filter(c => c.status === 'نشط').length})</TabsTrigger>
                      <TabsTrigger value="inactive">غير نشطين ({customerData.filter(c => c.status === 'غير نشط').length})</TabsTrigger>
                      <TabsTrigger value="new">العملاء الجدد ({customerData.filter(c => c.status === 'جديد').length})</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="border rounded-lg overflow-hidden">
                    {selectedCustomers.length > 0 && (
                      <div className="bg-muted/15 border-b p-3 flex items-center justify-between">
                        <div className="text-sm">
                          تم تحديد {selectedCustomers.length} عميل
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={handleAddPoints}>
                            <BadgeDollarSign className="h-3.5 w-3.5 ml-1" />
                            إضافة نقاط
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs flex items-center" onClick={handleSendMessageToSelected}>
                            <MessageSquare className="h-3.5 w-3.5 ml-1" />
                            إرسال رسالة
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs flex items-center text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleDeleteSelectedCustomers}>
                            <Trash2 className="h-3.5 w-3.5 ml-1" />
                            حذف
                          </Button>
                        </div>
                      </div>
                    )}

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox 
                              checked={selectedCustomers.length > 0 && selectedCustomers.length === filteredCustomers.length} 
                              onCheckedChange={handleSelectAllCustomers} 
                            />
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                            <div className="flex items-center">
                              العميل
                              {sortField === 'name' && (
                                sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead>الحالة</TableHead>
                          <TableHead>المستوى</TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('points')}>
                            <div className="flex items-center">
                              النقاط
                              {sortField === 'points' && (
                                sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('visits')}>
                            <div className="flex items-center">
                              الزيارات
                              {sortField === 'visits' && (
                                sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('dateJoined')}>
                            <div className="flex items-center">
                              تاريخ الإنضمام
                              {sortField === 'dateJoined' && (
                                sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="text-left">الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomers.length > 0 ? (
                          filteredCustomers.map((customer) => (
                            <TableRow key={customer.id}>
                              <TableCell>
                                <Checkbox 
                                  checked={selectedCustomers.includes(customer.id)} 
                                  onCheckedChange={(checked) => handleSelectCustomer(customer.id, !!checked)} 
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="text-xs font-medium">
                                      {getInitials(customer.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{customer.name}</div>
                                    <div className="text-xs text-muted-foreground">{customer.phone}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    customer.status === 'نشط'
                                      ? 'border-green-200 bg-green-50 text-green-700'
                                      : customer.status === 'غير نشط'
                                      ? 'border-orange-200 bg-orange-50 text-orange-700'
                                      : 'border-blue-200 bg-blue-50 text-blue-700'
                                  }`}
                                >
                                  {customer.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    customer.tier === 'ذهبي'
                                      ? 'border-amber-200 bg-amber-50 text-amber-700'
                                      : customer.tier === 'فضي'
                                      ? 'border-slate-200 bg-slate-50 text-slate-700'
                                      : customer.tier === 'بلاتيني'
                                      ? 'border-sky-200 bg-sky-50 text-sky-700'
                                      : 'border-gray-200 bg-gray-50 text-gray-700'
                                  }`}
                                >
                                  {customer.tier}
                                </Badge>
                              </TableCell>
                              <TableCell>{customer.points}</TableCell>
                              <TableCell>{customer.visits}</TableCell>
                              <TableCell>{customer.dateJoined}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <FileEdit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8">
                              <div className="flex flex-col items-center justify-center">
                                <Search className="h-10 w-10 text-muted-foreground/50 mb-3" />
                                <p className="text-muted-foreground">لا توجد نتائج مطابقة</p>
                                <Button 
                                  variant="link" 
                                  onClick={() => {
                                    setCustomerSearchText('');
                                    setCustomerStatusFilter('all');
                                    setCustomerTierFilter('all');
                                  }}
                                >
                                  مسح عوامل التصفية
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'loyalty' && (
              <div>
                <h3 className="text-lg font-medium mb-6">إعدادات برنامج الولاء</h3>
                {/* Program settings form will go here */}
              </div>
            )}
            
            {activeTab === 'card' && (
              <div>
                <h3 className="text-lg font-medium mb-6">تصميم بطاقة الولاء</h3>
                <CardDesigner
                  cardType={cardType}
                />
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-medium mb-6">إدارة الإشعارات</h3>
                {/* Notifications content will go here */}
              </div>
            )}
            
            {activeTab === 'staff' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h3 className="text-lg font-medium mb-2 md:mb-0">إدارة الموظفين</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="flex items-center" onClick={handleAddNewStaff}>
                      <UserPlus className="h-4 w-4 ml-1" />
                      إضافة موظف
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث بالاسم أو البريد..."
                        value={staffSearchText}
                        onChange={(e) => setStaffSearchText(e.target.value)}
                        className="pl-3 pr-9 bg-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select 
                        value={staffStatusFilter} 
                        onValueChange={setStaffStatusFilter}
                      >
                        <SelectTrigger className="w-[140px] bg-white">
                          <SelectValue placeholder="الحالة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع الحالات</SelectItem>
                          <SelectItem value="active">نشط</SelectItem> {/* Value matches backend */}
                          <SelectItem value="inactive">غير نشط</SelectItem> {/* Value matches backend */}
                        </SelectContent>
                      </Select>
                      <Select 
                        value={staffRoleFilter} 
                        onValueChange={setStaffRoleFilter}
                      >
                        <SelectTrigger className="w-[140px] bg-white">
                          <SelectValue placeholder="الدور" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع الأدوار</SelectItem>
                          {/* Use fetched rolesList for filtering options */}
                          {rolesList.map(role => (
                            <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="bg-white"
                        onClick={() => {
                          setStaffSearchText('');
                          setStaffStatusFilter('all');
                          setStaffRoleFilter('all');
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Updated Tab Triggers with counts from staffList */}
                  <Tabs value={staffActiveTab} onValueChange={setStaffActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">جميع الموظفين ({staffList.length})</TabsTrigger>
                      <TabsTrigger value="active">النشطين ({staffList.filter(s => s.status === 'active').length})</TabsTrigger>
                      <TabsTrigger value="inactive">غير النشطين ({staffList.filter(s => s.status === 'inactive').length})</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="border rounded-lg overflow-hidden">
                    {selectedStaff.length > 0 && (
                      <div className="bg-muted/15 border-b p-3 flex items-center justify-between">
                        <div className="text-sm">
                          تم تحديد {selectedStaff.length} موظف
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-xs flex items-center text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleDeleteSelectedStaff}>
                            <Trash2 className="h-3.5 w-3.5 ml-1" />
                            حذف
                          </Button>
                        </div>
                      </div>
                    )}

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox 
                              checked={selectedStaff.length > 0 && selectedStaff.length === filteredStaff.length} 
                              onCheckedChange={handleSelectAllStaff} 
                            />
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleStaffSort('name')}>
                            <div className="flex items-center">
                              الموظف
                              {staffSortField === 'name' && (
                                staffSortDirection === 'asc' ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleStaffSort('role')}>
                            <div className="flex items-center">
                              الدور
                              {staffSortField === 'role' && (
                                staffSortDirection === 'asc' ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead>الحالة</TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleStaffSort('dateJoined')}>
                            <div className="flex items-center">
                              تاريخ الإنضمام
                              {staffSortField === 'dateJoined' && (
                                staffSortDirection === 'asc' ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleStaffSort('lastActive')}>
                            <div className="flex items-center">
                              آخر نشاط
                              {staffSortField === 'lastActive' && (
                                staffSortDirection === 'asc' ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="text-left">الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoadingStaff ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-16"> {/* Colspan adjusted */}
                              <div className="flex flex-col items-center justify-center text-muted-foreground">
                                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                                  جاري تحميل الموظفين...
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : filteredStaff.length > 0 ? (
                          filteredStaff.map((staff: StaffMember) => ( // Type staff
                            <TableRow key={staff.id}>
                              <TableCell>
                                <Checkbox 
                                  checked={selectedStaff.includes(staff.id)} // Use string ID
                                  onCheckedChange={(checked) => handleSelectStaff(staff.id, !!checked)} // Use string ID
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="text-xs font-medium">
                                      {getInitials(staff.username || staff.email)} {/* Use username or email */}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    {/* Use staff.username from backend */}
                                    <div className="font-medium">{staff.username || 'N/A'}</div> 
                                    <div className="text-xs text-muted-foreground">{staff.email}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {/* Display Role Name */}
                                <Badge
                                  variant="outline"
                                  className="border-blue-200 bg-blue-50 text-blue-700"
                                >
                                  {rolesList.find(r => r.id === staff.role_id)?.name || 'غير معروف'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {/* Display Status from backend */}
                                <Badge
                                  variant="outline"
                                  className={`${ 
                                        staff.status === 'active'
                                        ? 'border-green-200 bg-green-50 text-green-700'
                                        : 'border-orange-200 bg-orange-50 text-orange-700'
                                    }`}
                                >
                                  {staff.status === 'active' ? 'نشط' : 'غير نشط'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {/* Display Date Joined (formatted) */}
                                {staff.created_at ? new Date(staff.created_at).toLocaleDateString('ar-SA') : 'N/A'}
                              </TableCell>
                              <TableCell>
                                {/* Display Last Active (formatted) */}
                                {staff.last_login ? new Date(staff.last_login).toLocaleDateString('ar-SA') : '-'}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  {/* Actions: Edit, Resend Invite, Delete etc. - Implement later */}
                                  <Button variant="ghost" size="icon" className="h-8 w-8" title="تعديل (قيد الإنشاء)">
                                    <FileEdit className="h-4 w-4" />
                                  </Button>
                                  {staff.status === 'inactive' && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8" title="إعادة إرسال دعوة (قيد الإنشاء)">
                                        <Mail className="h-4 w-4 text-blue-600" />
                                    </Button>
                                  )}
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="حذف (قيد الإنشاء)">
                                    <UserMinus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-16"> {/* Colspan adjusted */}
                              <div className="flex flex-col items-center justify-center">
                                <Search className="h-10 w-10 text-muted-foreground/50 mb-3" />
                                <p className="text-muted-foreground">
                                  {staffSearchText || staffStatusFilter !== 'all' || staffRoleFilter !== 'all' ? 
                                    'لا توجد نتائج مطابقة للبحث' : 
                                    'لا يوجد موظفين لعرضهم. قم بإضافة موظف جديد.'}
                                </p>
                                {(staffSearchText || staffStatusFilter !== 'all' || staffRoleFilter !== 'all') && (
                                  <Button 
                                    variant="link" 
                                    onClick={() => {
                                      setStaffSearchText('');
                                      setStaffStatusFilter('all');
                                      setStaffRoleFilter('all');
                                    }}
                                  >
                                    مسح الفلاتر
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* --- Add Staff Dialog --- */}
                  <Dialog open={isAddStaffDialogOpen} onOpenChange={setIsAddStaffDialogOpen}>
                    <DialogContent className="sm:max-w-[450px]">
                      <DialogHeader>
                        <DialogTitle>إضافة موظف جديد</DialogTitle>
                        <DialogDescription>
                          سيتم إرسال دعوة للموظف عبر البريد الإلكتروني لتعيين كلمة المرور وتفعيل الحساب.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">الاسم الكامل</Label>
                          <Input 
                            id="name" 
                            value={newStaffMember.name} 
                            onChange={(e) => setNewStaffMember({...newStaffMember, name: e.target.value})} 
                            placeholder="أدخل الاسم الكامل للموظف"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">البريد الإلكتروني</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={newStaffMember.email} 
                            onChange={(e) => setNewStaffMember({...newStaffMember, email: e.target.value})} 
                            placeholder="example@company.com"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="role">الدور الوظيفي</Label>
                          <Select
                            value={newStaffMember.role}
                            onValueChange={(value) => setNewStaffMember({...newStaffMember, role: value})}
                            disabled={isLoadingRoles}
                          >
                            <SelectTrigger id="role">
                              <SelectValue placeholder={isLoadingRoles ? "جاري تحميل الأدوار..." : "اختر الدور الوظيفي"} />
                            </SelectTrigger>
                            <SelectContent>
                              {isLoadingRoles ? (
                                <SelectItem value="loading" disabled>جاري تحميل الأدوار...</SelectItem>
                              ) : rolesList.length > 0 ? (
                                rolesList.map(role => (
                                  <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                                ))
                              ) : (
                                <SelectItem value="no-roles" disabled>لا توجد أدوار متاحة</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddStaffDialogOpen(false)}>إلغاء</Button>
                        <Button onClick={handleSubmitNewStaff} disabled={isLoadingStaff}>
                           {isLoadingStaff ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                جاري الإضافة...
                              </> 
                           ) : (
                              "إضافة وإرسال دعوة"
                           )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default BusinessDashboard;

