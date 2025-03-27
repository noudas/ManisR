const TwoFactorTypes = {
  EnableTwoFactorResponse: {
    message: "string",
    qrCode: "string", // Base64 string of the QR code
    secret: "string", // Secret key for backup
  },
  
  TwoFactorVerifyRequest: {
    userId: "number",
    token: "string",
  }
};

export default TwoFactorTypes;
