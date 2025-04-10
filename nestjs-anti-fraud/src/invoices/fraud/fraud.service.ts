import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProcessInvoiceFraudDto } from '../dto/process-invoice-fraud.dto';
import { Account, InvoiceStatus } from 'generated/prisma';
import { ConfigService } from '@nestjs/config';

enum FraudReason {
  NONE = 'NONE',
  SUSPICIOUS_ACCOUNT = 'SUSPICIOUS_ACCOUNT',
  UNUSUAL_PATTERN = 'UNUSUAL_PATTERN',
  FREQUENT_HIGH_VALUE = 'FREQUENT_HIGH_VALUE',
}

@Injectable()
export class FraudService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async processInvoice(processInvoiceFraudDto: ProcessInvoiceFraudDto) {
    const { invoice_id, account_id, amount } = processInvoiceFraudDto;

    const foundedInvoice = await this.prismaService.invoice.findUnique({
      where: { id: invoice_id },
    });
    if (foundedInvoice) {
      throw new Error('Invoice has already been processed');
    }

    const account = await this.prismaService.account.upsert({
      where: {
        id: account_id,
      },
      update: {},
      create: {
        id: account_id,
      },
    });

    const fraudResult = await this.detectFraud({
      account,
      amount,
    });

    const invoice = await this.prismaService.invoice.create({
      data: {
        id: invoice_id,
        accountId: account.id,
        amount,
        fraudHistory: fraudResult.hasFraud
          ? {
              create: {
                reason: fraudResult.reason,
                description: fraudResult.description,
              },
            }
          : undefined,
        status: fraudResult.hasFraud
          ? InvoiceStatus.REJECTED
          : InvoiceStatus.APPROVED,
      },
    });

    return {
      invoice,
      fraudResult,
    };
  }

  async detectFraud(data: { account: Account; amount: number }): Promise<
    | {
        hasFraud: true;
        reason: FraudReason;
        description: string;
      }
    | {
        hasFraud: false;
      }
  > {
    const { account, amount } = data;

    const SUSPICIOUS_VARIATION_PERCENTAGE =
      this.configService.getOrThrow<number>('SUSPICIOUS_VARIATION_PERCENTAGE');
    const INVOICES_HISTORY_COUNT = this.configService.getOrThrow<number>(
      'INVOICES_HISTORY_COUNT',
    );
    const SUSPICIOUS_INVOICES_COUNT = this.configService.getOrThrow<number>(
      'SUSPICIOUS_INVOICES_COUNT',
    );
    const SUSPICIOUS_TIMEFRAME_HOURS = this.configService.getOrThrow<number>(
      'SUSPICIOUS_TIMEFRAME_HOURS',
    );

    if (account.isSuspicious) {
      return {
        hasFraud: true,
        reason: FraudReason.SUSPICIOUS_ACCOUNT,
        description: 'Account is marked as suspicious',
      };
    }

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

    const recentDate = new Date();
    recentDate.setHours(recentDate.getHours() - SUSPICIOUS_TIMEFRAME_HOURS);
    const recentInvoices = await this.prismaService.invoice.findMany({
      where: {
        accountId: account.id,
        createdAt: { gte: recentDate },
      },
    });
    if (recentInvoices.length >= SUSPICIOUS_INVOICES_COUNT) {
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
