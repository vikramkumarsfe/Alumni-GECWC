"use client";
import {  BellRing, BellOff,  } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

// Shadcn UI
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";

import clientCatchError from "@/utils/clientCatchError";

type Props = {
  redirectUrl?: string;
  showLabel?: boolean;
};

export default function NotificationBell({
  redirectUrl = "/alumni/announcements",
  showLabel = true,
}: Props) {
  const { token, enableNotifications, clearToken } = usePushNotifications();

  // Disable handler
  const disableNotifications = async () => {
    try {
      clearToken(); // remove from localStorage + state

      // OPTIONAL: remove from DB
    //   await axios.post("/api/remove-fcm-token");
    } catch (err) {
      return clientCatchError(err)
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-3">

   
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={redirectUrl}
              className="flex items-center justify-center p-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
            >
              <AntBadge dot={!!token} color="#7c3aed" offset={[-2, 2]}>
                <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </AntBadge>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>View Announcements</p>
          </TooltipContent>
        </Tooltip> */}

        {/* Actions */}
        {showLabel && (
          <div className="flex items-center gap-2">

            {/* Enable */}
            {!token && (
              <Button
                onClick={enableNotifications}
                size="sm"
                className="h-7 text-xs px-3 bg-violet-600 hover:bg-violet-700 text-white"
              >
                <BellRing className="w-3 h-3 mr-1.5" />
                Enable Notification
              </Button>
            )}

            {/* Enabled + Disable */}
            {token && (
              <>

                <Button
                  onClick={disableNotifications}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-3"
                >
                  <BellOff className="w-3 h-3 mr-1.5" />
                  Disable Notification
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}