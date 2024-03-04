import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@danielrgntickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
