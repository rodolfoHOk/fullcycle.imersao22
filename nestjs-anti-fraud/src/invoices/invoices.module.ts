import { Module } from '@nestjs/common';
import { FraudService } from './fraud/fraud.service';
import { FraudAggregateSpecification } from './fraud/specifications/fraud-aggregate-specification';
import { FrequencyHighValueSpecification } from './fraud/specifications/frequency-high-value.specification';
import { SuspiciousAccountSpecification } from './fraud/specifications/suspicious-account.specification';
import { UnusualAmountSpecification } from './fraud/specifications/unusual-amount.specification';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';

@Module({
  providers: [
    FraudService,
    FrequencyHighValueSpecification,
    SuspiciousAccountSpecification,
    UnusualAmountSpecification,
    FraudAggregateSpecification,
    {
      provide: 'FRAUD_SPECIFICATIONS',
      inject: [
        FrequencyHighValueSpecification,
        SuspiciousAccountSpecification,
        UnusualAmountSpecification,
      ],
      useFactory(
        frequencyHighValueSpecification: FrequencyHighValueSpecification,
        suspiciousAccountSpecification: SuspiciousAccountSpecification,
        unusualAmountSpecification: UnusualAmountSpecification,
      ) {
        return [
          frequencyHighValueSpecification,
          suspiciousAccountSpecification,
          unusualAmountSpecification,
        ];
      },
    },
    InvoicesService,
  ],
  controllers: [InvoicesController],
})
export class InvoicesModule {}
