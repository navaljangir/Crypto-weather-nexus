'use client'

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, BellOff } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../lib/store"
import { markAllAsRead, selectAllAlerts, selectUnreadCount } from "../lib/redux/notificationSlice"

export default function Notification() {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(selectAllAlerts);
  const unreadCount = useAppSelector(selectUnreadCount);


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full px-1.5 py-0.5 text-xs">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(markAllAsRead())}
          >
            Mark all as read
          </Button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              <BellOff className="mx-auto h-6 w-6 mb-2" />
              No notifications yet
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.timestamp}
                className={`p-4 border-b flex items-start gap-3 ${
                  !alert.read ? '' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{alert.asset || 'Weather Alert'}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                    {!alert.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
                {alert.type === 'price_alert' && (
                  <span
                    className={`text-sm ${
                      (alert.changePercent || 0) > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {alert.changePercent?.toFixed(2)}%
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}