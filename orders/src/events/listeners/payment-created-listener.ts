import {
  Listener,
  Subjects,
  PaymentCreatedEvent,
  OrderStatus,
} from '@danielrgntickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], message: Message) {
    const { orderId } = data;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order Not Found');
    }

    order.set({
      status: OrderStatus.Complete,
    });

    await order.save();

    message.ack();
  }
}
