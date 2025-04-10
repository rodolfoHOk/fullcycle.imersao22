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
export class FrequencyHighValueSpecification implements IFraudeSpecification {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async detectFraud(
    context: FraudSpecificationContext,
  ): Promise<FraudDetectionResult> {
    const SUSPICIOUS_INVOICES_COUNT = this.configService.getOrThrow<number>(
      'SUSPICIOUS_INVOICES_COUNT',
    );
    const SUSPICIOUS_TIMEFRAME_HOURS = this.configService.getOrThrow<number>(
      'SUSPICIOUS_TIMEFRAME_HOURS',
    );

    const { account } = context;
    const recentDate = new Date();
    recentDate.setHours(recentDate.getHours() - SUSPICIOUS_TIMEFRAME_HOURS);

    const recentInvoices = await this.prismaService.invoice.findMany({
      where: {
        accountId: account.id,
        createdAt: { gte: recentDate },
      },
    });

    if (recentInvoices.length >= SUSPICIOUS_INVOICES_COUNT) {
      await this.prismaService.account.update({
        where: { id: account.id },
        data: { isSuspicious: true },
      });

      return {
        hasFraud: true,
        reason: FraudReason.FREQUENT_HIGH_VALUE,
        description: 'Account has too many invoices in a short period',
      };
    }

    return {
      hasFraud: false,
    };
  }
}
