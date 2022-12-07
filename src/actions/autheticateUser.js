export const AUTHENTICATE_USER = "AUTHENTICATE_USER";

export function authenticateUser(user) {
    return {
      type: AUTHENTICATE_USER,
      user,
    };
  }