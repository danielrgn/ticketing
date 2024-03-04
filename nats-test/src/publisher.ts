import nats from 'node-nats-streaming';
import { TicketedCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketedCreatedPublisher(stan);
  try {
    publisher.publish({
      id: '23',
      title: '12312',
      price: 1232,
    });
  } catch (err) {
    console.log(err);
  }
});
