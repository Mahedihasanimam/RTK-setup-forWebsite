import { api } from "../../baseApi";

// Notification item type
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Response type for marking all read (optional)
export interface MarkAllReadResponse {
  success: boolean;
}

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET all notifications
    getallnotification: builder.query<NotificationItem[], void>({
      query: () => `notify`,
      providesTags: ["notification"],
    }),

    // Mark a single notification as read
    readNotification: builder.mutation<NotificationItem, string>({
      query: (id) => ({
        url: `notify/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),

    // Mark all notifications as read
    redallnotification: builder.mutation<MarkAllReadResponse, void>({
      query: () => ({
        url: `notify-all-read`,
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage
export const {
  useGetallnotificationQuery,
  useReadNotificationMutation,
  useRedallnotificationMutation,
} = notificationApi;
