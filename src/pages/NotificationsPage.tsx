
import React, { useState } from 'react';
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Bell, BellOff, Check, CheckCheck, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Notification, NotificationIcon, NotificationTitle, NotificationDescription } from '@/components/ui/notification';
import { useNotifications, NotificationType } from '@/hooks/use-notifications';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function NotificationsPage() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAll, 
    addNotification 
  } = useNotifications();
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(notification => !notification.read);

  const getVariantIcon = (variant: NotificationType) => {
    switch (variant) {
      case "info":
        return "text-blue-500"
      case "success":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "destructive":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  // Test functionality to add a new notification
  const addTestNotification = () => {
    const variants: NotificationType[] = ["default", "info", "success", "warning", "destructive"];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    
    addNotification({
      title: "إشعار جديد",
      description: "هذا إشعار تجريبي تم إنشاؤه للاختبار",
      variant: randomVariant
    });
  };

  return (
    <div className="container mx-auto py-6" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">إدارة الإشعارات</h1>
          <p className="text-muted-foreground">عرض وإدارة جميع الإشعارات الخاصة بك</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={addTestNotification}>
            إضافة إشعار جديد
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>الإشعارات</CardTitle>
              <CardDescription>
                لديك {unreadCount} {unreadCount === 1 ? 'إشعار' : 'إشعارات'} غير مقروءة
              </CardDescription>
            </div>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="flex items-center gap-1"
                >
                  <CheckCheck className="h-4 w-4" />
                  <span>تعيين الكل كمقروء</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>مسح الكل</span>
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "unread")}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">جميع الإشعارات ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">غير مقروءة ({unreadCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {renderNotificationsList(filteredNotifications)}
            </TabsContent>
            <TabsContent value="unread">
              {renderNotificationsList(filteredNotifications)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  function renderNotificationsList(notificationsList: typeof notifications) {
    if (notificationsList.length === 0) {
      return (
        <Alert>
          <BellOff className="h-4 w-4" />
          <AlertTitle>لا توجد إشعارات</AlertTitle>
          <AlertDescription>
            لا توجد إشعارات لعرضها حاليًا.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <ScrollArea className="h-[600px]">
        <div className="space-y-2">
          {notificationsList.map((notification) => (
            <Notification
              key={notification.id}
              variant={notification.variant}
              className={`${!notification.read ? 'border-r-4 border-r-primary' : ''}`}
              onDismiss={() => removeNotification(notification.id)}
            >
              <NotificationIcon className={getVariantIcon(notification.variant || "default")}>
                <Bell className="h-5 w-5" />
              </NotificationIcon>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <NotificationTitle>{notification.title}</NotificationTitle>
                  <time className="text-xs text-muted-foreground">
                    {format(notification.createdAt, 'PPp', { locale: ar })}
                  </time>
                </div>
                {notification.description && (
                  <NotificationDescription>
                    {notification.description}
                  </NotificationDescription>
                )}
                {notification.read ? (
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <CheckCheck className="h-3 w-3 mr-1" /> تم القراءة
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="self-start p-0 h-6 mt-1 text-xs hover:bg-transparent hover:underline"
                  >
                    <Check className="h-3 w-3 mr-1" /> تعيين كمقروء
                  </Button>
                )}
              </div>
            </Notification>
          ))}
        </div>
      </ScrollArea>
    );
  }
}
