type FeedbackStatus = "Pending" | "Reviewed" | "Resolved";

interface FeedbackItem {
  id: number;
  name: string;
  email: string;
  category: string;
  message: string;
  date: string;
  status: FeedbackStatus;
  avatar?: string;
  initials?: string;
}