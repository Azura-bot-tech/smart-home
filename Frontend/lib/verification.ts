// Store verification codes with expiration time
export const verificationCodes = new Map<
  string,
  { code: string; expires: number }
>();
