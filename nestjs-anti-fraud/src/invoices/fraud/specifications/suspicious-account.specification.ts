import { Injectable } from '@nestjs/common';
import {
  FraudDetectionResult,
  FraudReason,
  FraudSpecificationContext,
  IFraudeSpecification,
} from './fraud-specification.interface';

@Injectable()
export class SuspiciousAccountSpecification implements IFraudeSpecification {
  detectFraud(context: FraudSpecificationContext): FraudDetectionResult {
    const { account } = context;

    if (account.isSuspicious) {
      return {
        hasFraud: true,
        reason: FraudReason.SUSPICIOUS_ACCOUNT,
        description: 'Account is marked as suspicious',
      };
    }

    return {
      hasFraud: false,
    };
  }
}
