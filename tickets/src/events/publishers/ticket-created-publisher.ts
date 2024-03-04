import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@danielrgntickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
