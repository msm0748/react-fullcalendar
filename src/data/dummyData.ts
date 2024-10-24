import { EventInput } from '@fullcalendar/core/index.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * data type
 * https://fullcalendar.io/docs/event-object
 */
export const dumyData: EventInput[] = [
  {
    id: uuidv4(),
    title: '회의',
    start: '2024-10-23T10:30:00',
    end: '2024-10-23T14:30:00',
    allDay: false,
  },
];
