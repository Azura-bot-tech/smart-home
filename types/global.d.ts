declare global {
  var verificationCodes: Map<
    string,
    {
      code: string;
      expiry: number;
    }
  >;
}

export {};
