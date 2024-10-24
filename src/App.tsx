import { useState } from 'react';
import { EventInput } from '@fullcalendar/core/index.js';
import dayjs from 'dayjs';
import { dumyData } from './data/dummyData';
import { SelectedDate } from './types/Calendar';
import AddScheduleModal from './components/modal/AddScheduleModal';
import Calendar from './components/Calendar';

export default function App() {
  const [events, setEvents] = useState<EventInput[]>(dumyData);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    allDay: true,
  });
  const [isAddScheduleModal, setIsAddScheduleModal] = useState(false);

  const openAddScheduleModal = () => {
    setIsAddScheduleModal(true);
  };

  const addEvent = (event: EventInput) => {
    setEvents([...events, event]);
  };

  const updateEvent = (id: string, start: string, end: string) => {
    setEvents((event) => {
      return event.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            start,
            end,
          };
        }
        return item;
      });
    });
  };

  const selectDate = (selectedDate: SelectedDate) => {
    setSelectedDate(selectedDate);
  };

  return (
    <div className="h-dvh p-10">
      <Calendar
        events={events}
        openAddScheduleModal={openAddScheduleModal}
        selectDate={selectDate}
        updateEvent={updateEvent}
      />
      {isAddScheduleModal && (
        <AddScheduleModal
          open={isAddScheduleModal}
          closeModal={() => setIsAddScheduleModal(false)}
          addEvent={addEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
