import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from '@danielrgntickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      userId: data.userId,
      status: data.status,
      version: data.version,
    });

    await order.save();

    message.ack();
  }
}
