export type EnableTwoFactorResponse = {
    message: string;
    qrCode: string; // Base64 string of the QR code
    secret: string; // Secret key for backup
  };

  

export type TwoFactorVerifyRequest = {
    userId: number;
    token: string;
  };
  