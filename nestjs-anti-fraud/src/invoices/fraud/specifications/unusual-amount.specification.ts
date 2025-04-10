import { PrismaService } from 'src/prisma/prisma.service';
import {
  FraudDetectionResult,
  FraudReason,
  FraudSpecificationContext,
  IFraudeSpecification,
} from './fraud-specification.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnusualAmountSpecification implements IFraudeSpecification {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async detectFraud(
    context: FraudSpecificationContext,
  ): Promise<FraudDetectionResult> {
    const { account, amount } = context;

    const SUSPICIOUS_VARIATION_PERCENTAGE =
      this.configService.getOrThrow<number>('SUSPICIOUS_VARIATION_PERCENTAGE');
    const INVOICES_HISTORY_COUNT = this.configService.getOrThrow<number>(
      'INVOICES_HISTORY_COUNT',
    );

    const previousInvoices = await this.prismaService.invoice.findMany({
      where: { accountId: account.id },
      orderBy: { createdAt: 'desc' },
      take: INVOICES_HISTORY_COUNT,
    });

    if (previousInvoices.length) {
      const totalAmount = previousInvoices.reduce(
        (acc, invoice) => acc + invoice.amount,
        0,
      );
      const averageAmount = totalAmount / previousInvoices.length;
      if (
        amount >
        averageAmount * (1 + (SUSPICIOUS_VARIATION_PERCENTAGE + 1) / 100)
      ) {
        return {
          hasFraud: true,
          reason: FraudReason.UNUSUAL_PATTERN,
          description: 'Invoice amount is significantly higher than average',
        };
      }
    }

    return {
      hasFraud: false,
    };
  }
}
