
import * as React from "react"
import { useToast } from "@/hooks/use-toast"

export type NotificationType = "default" | "info" | "success" | "warning" | "destructive"

export interface Notification {
  id: string
  title: string
  description?: string
  variant?: NotificationType
  read: boolean
  createdAt: Date
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationsContext = React.createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const { toast } = useToast()

  const unreadCount = React.useMemo(() => {
    return notifications.filter(notification => !notification.read).length
  }, [notifications])

  const addNotification = React.useCallback((notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      read: false,
      createdAt: new Date(),
    }

    setNotifications(prev => [newNotification, ...prev])

    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.description,
      variant: notification.variant === "destructive" ? "destructive" : "default",
    })

    return newNotification
  }, [toast])

  const markAsRead = React.useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    )
  }, [])

  const markAllAsRead = React.useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }, [])

  const removeNotification = React.useCallback((id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    )
  }, [])

  const clearAll = React.useCallback(() => {
    setNotifications([])
  }, [])

  // Mock initial notifications for demo purposes
  React.useEffect(() => {
    const initialNotifications: Notification[] = [
      {
        id: "1",
        title: "مرحبًا بك في إدارة الإشعارات",
        description: "هذا هو نظام إدارة الإشعارات الجديد",
        variant: "info",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      },
      {
        id: "2",
        title: "تم تحديث حساب الموظف",
        description: "تم تحديث بيانات الموظف بنجاح",
        variant: "success",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      },
      {
        id: "3",
        title: "تنبيه: تحديث النظام",
        description: "سيتم تحديث النظام غدًا من الساعة 2-3 مساءً",
        variant: "warning",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      },
    ]
    
    setNotifications(initialNotifications)
  }, [])

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = React.useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}
