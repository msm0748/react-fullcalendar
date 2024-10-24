import { Modal } from 'antd';
import ScheduleForm from '../form/ScheduleForm';
import { EventInput } from '@fullcalendar/core/index.js';
import { SelectedDate } from '../../types/Calendar';

interface Props {
  open: boolean;
  closeModal: () => void;
  addEvent: (event: EventInput) => void;
  selectedDate: SelectedDate;
}

export default function AddScheduleModal({
  open,
  closeModal,
  addEvent,
  selectedDate,
}: Props) {
  return (
    <Modal
      open={open}
      onCancel={closeModal}
      centered={true}
      width={640}
      footer={null} // 모달 버튼 제거
    >
      <div className="pt-6">
        <ScheduleForm
          closeModal={closeModal}
          addEvent={addEvent}
          selectedDate={selectedDate}
        />
      </div>
    </Modal>
  );
}
