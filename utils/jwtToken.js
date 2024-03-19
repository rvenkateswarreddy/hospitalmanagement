export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Determine the cookie name based on the user's role
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true; // Set secure flag for HTTPS only
  }

  res.status(statusCode).cookie(cookieName, token, cookieOptions).json({
    success: true,
    message,
    user,
    token,
  });
};
