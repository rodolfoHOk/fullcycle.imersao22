import { Account } from 'generated/prisma';

export enum FraudReason {
  NONE = 'NONE',
  SUSPICIOUS_ACCOUNT = 'SUSPICIOUS_ACCOUNT',
  UNUSUAL_PATTERN = 'UNUSUAL_PATTERN',
  FREQUENT_HIGH_VALUE = 'FREQUENT_HIGH_VALUE',
}

export type FraudSpecificationContext = {
  account: Account;
  amount: number;
  invoiceId: string;
};

export type FraudDetectionResult = {
  hasFraud: boolean;
  reason?: FraudReason;
  description?: string;
};

export interface IFraudeSpecification {
  detectFraud(
    context: FraudSpecificationContext,
  ): Promise<FraudDetectionResult> | FraudDetectionResult;
}
