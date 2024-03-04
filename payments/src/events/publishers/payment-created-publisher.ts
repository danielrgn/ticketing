import {
  Publisher,
  PaymentCreatedEvent,
  Subjects,
} from '@danielrgntickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
