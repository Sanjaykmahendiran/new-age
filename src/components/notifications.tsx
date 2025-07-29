"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BellRing } from "lucide-react";
import toast from "react-hot-toast";
// import Cookies from "js-cookie";
import Spinner from "@/components/spinner";
import { axiosInstance } from "@/configs/axios";

interface Notification {
  notification_id: number;
  user_id?: number;
  notification_type?: string;
  title: string;
  message: string;
  status: number;
  created_date: string;
  modified_date: string;
  not_time: string; // Stores "New" for unread notifications
}

// const getRecruiterIdFromCookies = () => {
//   const recruiterId = Cookies.get("recruiterId");
//   if (!recruiterId) {
//     console.warn("No userId found in cookies");
//     return null;
//   }
//   return recruiterId;
// };

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [open, setOpen] = useState(false);
  const [recruiterId, setRecruiterId] = useState<string | null>(null);

  // // Update userId from cookies when component mounts or cookies change
  // useEffect(() => {
  //   const cookieUserId = getRecruiterIdFromCookies();
  //   setRecruiterId(cookieUserId);
  // }, []);

  // const fetchNotifications = useCallback(async () => {
  //   // Don't fetch if userId is not available
  //   if (!recruiterId) {
  //     console.warn("Cannot fetch notifications: No userId available");
  //     return;
  //   }
    
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("", {
  //       params: { gofor: "notificalist", recruiter_id: recruiterId },
  //     });
  
  //     const data = response.data;
  
  //     if (Array.isArray(data)) {
  //       setNotifications(data);
  //       setHasUnread(data.some((notif) => notif.not_time === "New"));
  //     } else {
  //       console.error("Unexpected response format:", data);
  //       toast.error("Error fetching notifications");
  //       setNotifications([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //     toast.error("Failed to fetch notifications");
  //     setNotifications([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [recruiterId]);

  // useEffect(() => {
  //   if (recruiterId) {
  //     fetchNotifications();
      
  //     // Set up polling for new notifications only if userId exists
  //     const interval = setInterval(fetchNotifications, 60000); // Check every minute
  //     return () => clearInterval(interval);
  //   }
  // }, [recruiterId, fetchNotifications]);

  // // Set up a listener for cookie changes
  // useEffect(() => {
  //   const checkCookies = () => {
  //     const cookieUserId = getRecruiterIdFromCookies();
  //     if (cookieUserId !== recruiterId) {
  //       setRecruiterId(cookieUserId);
  //     }
  //   };

  //   // Check every 10 seconds for cookie changes
  //   const interval = setInterval(checkCookies, 10000);
    
  //   // Also listen for storage events in case cookies are modified
  //   const handleStorageChange = () => {
  //     checkCookies();
  //   };
    
  //   window.addEventListener('storage', handleStorageChange);
    
  //   return () => {
  //     clearInterval(interval);
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, [recruiterId]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // If no userId is available yet, show a minimal spinner
  if (!recruiterId) {
    return (
      <div className="flex items-center space-x-6 ml-auto">
        <BellRing className="text-gray-600 w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200" />
      </div>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center space-x-6 ml-auto outline-none focus:ring-0 border-none">
        <BellRing className="w-6 h-6 text-gray-600 cursor-pointer transform transition-transform duration-200 hover:scale-110" />
        {hasUnread && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-primary rounded-full" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[400px] p-0 mt-6 border rounded-xl shadow-xl bg-white"
        onCloseAutoFocus={(e) => e.preventDefault()} 
      >
        <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-xl">
          <h3 className="font-semibold text-left text-gray-700">
            Notifications
          </h3>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="p-8 flex justify-center">
              <Spinner />
            </div>
          ) : notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notif) => (
                <DropdownMenuItem
                  key={notif.notification_id}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-[#f3f2fa] focus:bg-accent-none cursor-default"
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-medium text-sm flex-shrink-0">
                    {notif.title && notif.title.charAt(0) || "N"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-black text-sm">
                        {notif.title || "Notification"}
                      </p>
                      {notif.not_time === "New" && (
                        <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-lg">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 break-words">
                      {notif.message || "No message content"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(notif.created_date)}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
