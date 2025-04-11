import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProcessInvoiceFraudDto } from '../dto/process-invoice-fraud.dto';
import { InvoiceStatus } from 'generated/prisma';
import { FraudAggregateSpecification } from './specifications/fraud-aggregate-specification';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InvoiceProcessedEvent } from '../events/invoice-processed.event';

@Injectable()
export class FraudService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fraudAggregateSpecification: FraudAggregateSpecification,
    private readonly eventEmitter: EventEmitter2,
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

    const fraudResult = await this.fraudAggregateSpecification.detectFraud({
      account,
      amount,
      invoiceId: invoice_id,
    });

    const invoice = await this.prismaService.invoice.create({
      data: {
        id: invoice_id,
        accountId: account.id,
        amount,
        fraudHistory: fraudResult.hasFraud
          ? {
              create: {
                reason: fraudResult.reason!,
                description: fraudResult.description,
              },
            }
          : undefined,
        status: fraudResult.hasFraud
          ? InvoiceStatus.REJECTED
          : InvoiceStatus.APPROVED,
      },
    });

    await this.eventEmitter.emitAsync(
      'invoice.processed',
      new InvoiceProcessedEvent(invoice, fraudResult),
    );

    return {
      invoice,
      fraudResult,
    };
  }
}
