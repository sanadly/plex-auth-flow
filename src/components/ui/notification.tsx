
import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { Bell, X } from "lucide-react"

import { cn } from "@/lib/utils"

const notificationVariants = cva(
  "group relative flex w-full items-center justify-between gap-4 rounded-md border p-4 shadow-sm transition-all",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
        success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
        destructive: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  onDismiss?: () => void
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ className, variant, onDismiss, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(notificationVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-center gap-4">
          {children}
        </div>
        {onDismiss && (
          <button
            className="inline-flex h-6 w-6 items-center justify-center rounded-md text-foreground/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={onDismiss}
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Notification.displayName = "Notification"

const NotificationIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex shrink-0 items-center justify-center", className)}
    {...props}
  />
))
NotificationIcon.displayName = "NotificationIcon"

const NotificationTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
NotificationTitle.displayName = "NotificationTitle"

const NotificationDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
NotificationDescription.displayName = "NotificationDescription"

export {
  Notification,
  NotificationIcon,
  NotificationTitle,
  NotificationDescription,
}
