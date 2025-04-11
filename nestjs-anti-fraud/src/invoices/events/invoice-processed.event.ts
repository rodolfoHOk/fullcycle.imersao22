import { Invoice } from 'generated/prisma';
import { FraudDetectionResult } from '../fraud/specifications/fraud-specification.interface';

export class InvoiceProcessedEvent {
  constructor(
    readonly invoice: Invoice,
    readonly fraudDetectionResult: FraudDetectionResult,
  ) {}
}
