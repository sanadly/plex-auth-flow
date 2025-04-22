
import * as React from "react"
import { Bell } from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { 
  Notification, 
  NotificationDescription, 
  NotificationIcon, 
  NotificationTitle 
} from "@/components/ui/notification"
import { useNotifications, NotificationType } from "@/hooks/use-notifications"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

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

export function NotificationsDropdown() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAll 
  } = useNotifications()
  const [open, setOpen] = React.useState(false)

  // Mark notification as read when clicked
  const handleNotificationClick = (id: string) => {
    markAsRead(id)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-2 text-right">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>الإشعارات</span>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead} 
                className="h-7 text-xs"
              >
                تعيين الكل كمقروء
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAll} 
                className="h-7 text-xs"
              >
                مسح الكل
              </Button>
            </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <ScrollArea className="h-[400px] overflow-y-auto">
            <DropdownMenuGroup>
              {notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id} 
                  className="p-0 focus:bg-transparent" 
                  onSelect={(e) => e.preventDefault()}
                >
                  <Notification 
                    variant={notification.variant} 
                    className={`my-1 w-full cursor-pointer ${!notification.read ? 'border-r-4 border-r-primary' : ''}`}
                    onClick={() => handleNotificationClick(notification.id)}
                    onDismiss={() => removeNotification(notification.id)}
                  >
                    <NotificationIcon className={getVariantIcon(notification.variant || "default")}>
                      <Bell className="h-5 w-5" />
                    </NotificationIcon>
                    <div className="flex flex-col gap-1">
                      <NotificationTitle>{notification.title}</NotificationTitle>
                      {notification.description && (
                        <NotificationDescription>
                          {notification.description}
                        </NotificationDescription>
                      )}
                      <time className="text-xs text-muted-foreground">
                        {format(notification.createdAt, 'PPp', { locale: ar })}
                      </time>
                    </div>
                  </Notification>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </ScrollArea>
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            لا توجد إشعارات
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
