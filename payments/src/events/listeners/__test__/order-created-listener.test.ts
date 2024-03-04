import mongoose, { mongo } from 'mongoose';
import { Message } from 'node-nats-streaming';
import {
  OrderCreatedEvent,
  OrderStatus,
  TicketUpdatedEvent,
} from '@danielrgntickets/common';
import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Order } from '../../../models/order';

const setup = async () => {
  // Create a listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create a fake data object
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: 'dasdas',
    ticket: {
      id: 'dasdasda',
      price: 999,
    },
    status: OrderStatus.Created,
    userId: 'ablskdjf',
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { msg, data, listener };
};

it('replicates the order info', async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
