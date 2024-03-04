import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@danielrgntickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
