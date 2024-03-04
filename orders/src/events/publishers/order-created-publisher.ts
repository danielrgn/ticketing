import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@danielrgntickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
