import { Logger } from '@nestjs/common';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';

export type KafkaServerOptions = any; // todo

export class ConfluentKafkaServer
  extends Server
  implements CustomTransportStrategy
{
  public readonly logger = new Logger(ConfluentKafkaServer.name);

  constructor(protected readonly options: KafkaServerOptions) {
    super();
  }

  // todo

  on<
    EventKey extends string = string,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    EventCallback extends Function = Function,
  >(event: EventKey, callback: EventCallback) {
    throw new Error('Method not implemented.');
  }

  unwrap<T>(): T {
    throw new Error('Method not implemented.');
  }

  listen(callback: (...optionalParams: unknown[]) => any) {
    throw new Error('Method not implemented.');
  }

  close() {
    throw new Error('Method not implemented.');
  }
}
