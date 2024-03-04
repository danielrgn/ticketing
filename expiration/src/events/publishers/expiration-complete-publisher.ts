import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@danielrgntickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
