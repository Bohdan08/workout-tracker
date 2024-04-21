const parseFirebaseErorrMessage = (errorMessage: string) => {
  if (errorMessage.includes("auth/code-expired")) {
    return "Code expired. Please Resend sms.";
  } else if (errorMessage.includes("many")) {
    return "Too many requests. Please try again later.";
  } else if (errorMessage.includes("invalid-verification-code")) {
    return "Invalid verification code";
  } else if (errorMessage.includes("auth/user-not-found")) {
    return "User doesn't exist in our system";
  } else if (errorMessage.includes("auth/wrong-password")) {
    return "Wrong Password. Please try again";
  } else if (errorMessage.includes("invalid-email")) {
    return "Invalid Email";
  } else if (errorMessage.includes("provider-already-linked")) {
    return "Your've already created a secure account. Please go to sign in page.";
  } else if (errorMessage.includes("auth/email-already-in-use")) {
    return "Email already in use";
  }  else if (errorMessage.includes("auth/invalid-credential")) {
    return "Invalid email or password";
  }

  return errorMessage;
};

export default parseFirebaseErorrMessage;
