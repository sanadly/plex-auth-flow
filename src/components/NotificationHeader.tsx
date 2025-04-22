
import React from "react";
import { Link } from "react-router-dom";
import { BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { useNotifications } from "@/hooks/use-notifications";

export function NotificationHeader() {
  const { unreadCount } = useNotifications();
  
  return (
    <div className="flex items-center justify-between border-b px-6 py-3">
      <h1 className="text-lg font-semibold">نظام الإشعارات</h1>
      
      <div className="flex items-center gap-4">
        <Link to="/notifications">
          <Button variant="outline" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            <span>جميع الإشعارات</span>
            {unreadCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </Link>
        
        <NotificationsDropdown />
      </div>
    </div>
  );
}
