import {
  Listener,
  Subjects,
  TicketUpdatedEvent,
} from '@danielrgntickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], message: Message) {
    const { title, price } = data;

    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error('Ticket Not Found');
    }

    ticket.set({
      title,
      price,
    });

    await ticket.save();

    message.ack();
  }
}
