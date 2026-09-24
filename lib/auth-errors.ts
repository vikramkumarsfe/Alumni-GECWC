export const ACCOUNT_INACTIVE_ERROR = "AccountInactive";

export function getLoginErrorMessage(error?: string | null) {
  if (error === ACCOUNT_INACTIVE_ERROR) {
    return "Your account is not active. Please contact the admin.";
  }
  if (error === "CredentialsSignin") {
    return "Email or password is incorrect.";
  }
  return "Unable to sign in. Please try again later.";
}
