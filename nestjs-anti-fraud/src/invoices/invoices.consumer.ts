import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { FraudService } from './fraud/fraud.service';

export type PendingInvoiceMessage = {
  account_id: string;
  invoice_id: string;
  amount: number;
};

@Controller()
export class InvoicesConsumer {
  private logger = new Logger(InvoicesConsumer.name);

  constructor(private fraudService: FraudService) {}

  @EventPattern('pending_transactions')
  async handlePendingInvoices(@Payload() message: PendingInvoiceMessage) {
    this.logger.log(`Processing invoice: ${message.invoice_id}`);

    await this.fraudService.processInvoice({
      account_id: message.account_id,
      invoice_id: message.invoice_id,
      amount: message.amount,
    });

    this.logger.log(`Invoice processed: ${message.invoice_id}`);
  }
}
