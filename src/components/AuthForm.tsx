// src/components/AuthForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Use your updated context
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Eye, EyeOff, LockKeyhole, UserCircle2, Building, User } from 'lucide-react'; // Added icons

// Define modes for the form
type AuthMode = 'login' | 'signup';

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login'); // 'login' or 'signup'
  const [email, setEmail] = useState(''); // Use email, not username
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For signup
  const [fullName, setFullName] = useState(''); // For signup
  const [businessName, setBusinessName] = useState(''); // For signup
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get functions and state from context
  const { login, signupOwner, loading, error } = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password); // Call login function from context
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!"); // Use toast ideally
      return;
    }
    await signupOwner(email, password, fullName, businessName); // Call signup function
  };

  const isLoginMode = mode === 'login';

  return (
    <Card className="w-full max-w-md shadow-lg border-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">
            {isLoginMode ? 'مرحباً بك' : 'إنشاء حساب مالك جديد'}
        </CardTitle>
        <CardDescription className="text-center">
          {isLoginMode ? 'قم بتسجيل الدخول للوصول إلى حسابك' : 'أدخل بياناتك لإنشاء حساب وعملك التجاري'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={isLoginMode ? handleLoginSubmit : handleSignupSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <div className="relative">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <UserCircle2 className="h-5 w-5 text-custom-primary" />
              </div>
              <Input
                id="email"
                type="email" // Use email type
                placeholder="example@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-10 bg-white border-custom-primary/20 focus:border-custom-primary"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <div className="relative">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <LockKeyhole className="h-5 w-5 text-custom-primary" />
              </div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 pl-10 bg-white border-custom-primary/20 focus:border-custom-primary"
                required
                minLength={6} // Add minLength validation feedback if possible
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-custom-primary" />
                ) : (
                  <Eye className="h-5 w-5 text-custom-primary" />
                )}
              </button>
            </div>
          </div>

          {/* Signup Only Fields */}
          {!isLoginMode && (
            <>
              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <LockKeyhole className="h-5 w-5 text-custom-primary" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="أعد إدخال كلمة المرور"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10 pl-10 bg-white border-custom-primary/20 focus:border-custom-primary"
                    required
                    minLength={6}
                  />
                   <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground focus:outline-none"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-custom-primary" />
                    ) : (
                      <Eye className="h-5 w-5 text-custom-primary" />
                    )}
                  </button>
                </div>
                 {password !== confirmPassword && confirmPassword && <p className="text-xs text-destructive pt-1">كلمات المرور غير متطابقة</p>}
              </div>

              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم الكامل</Label>
                 <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <User className="h-5 w-5 text-custom-primary" />
                  </div>
                  <Input
                    id="fullName"
                    placeholder="أدخل اسمك الكامل"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pr-10 bg-white border-custom-primary/20 focus:border-custom-primary"
                    required
                  />
                </div>
              </div>

              {/* Business Name Field */}
              <div className="space-y-2">
                <Label htmlFor="businessName">اسم النشاط التجاري</Label>
                 <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Building className="h-5 w-5 text-custom-primary" />
                  </div>
                  <Input
                    id="businessName"
                    placeholder="أدخل اسم النشاط التجاري"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                     className="pr-10 bg-white border-custom-primary/20 focus:border-custom-primary"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Display Error Message */}
          {error && <p className="text-destructive text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-custom-primary hover:bg-custom-primary/90"
            disabled={loading || (!isLoginMode && password !== confirmPassword)}
          >
            {loading ? (
              <>
                <div className="loading-spinner mr-2"></div>
                {isLoginMode ? 'جاري تسجيل الدخول...' : 'جاري إنشاء الحساب...'}
              </>
            ) : (
              isLoginMode ? 'تسجيل الدخول' : 'إنشاء حساب'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 items-center justify-center">
         {/* Toggle between Login and Signup */}
         <Button variant="link" onClick={() => setMode(isLoginMode ? 'signup' : 'login')} className="text-sm">
            {isLoginMode ? 'ليس لديك حساب؟ إنشاء حساب مالك جديد' : 'لديك حساب بالفعل؟ تسجيل الدخول'}
          </Button>
        {/* Removed mock credentials display */}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;

