type FeedbackStatus = "Pending" | "Reviewed" | "Resolved";

interface FeedbackItem {
  _id: string;
  fullname: string;
  email: string;
  category: string;
  message: string;
  createdAt: string;
  status: FeedbackStatus;
  avatar?: string;
  initials?: string;
}