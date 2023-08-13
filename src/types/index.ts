export interface UserTypes {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken: string | undefined;
    forgotPasswordTokenExpiry: Date | undefined,
    verifyToken: string | undefined,
    verifyTokenExpiry: string | undefined
  }