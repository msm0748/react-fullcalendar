import { ClockCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputRef,
  Switch,
  TimePicker,
} from 'antd';
import Row from './Row';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { EventInput } from '@fullcalendar/core/index.js';
import { SelectedDate } from '../../../types/Calendar';

type FieldType = {
  title: string;
  startDate: string;
  startTime?: string;
  endDate: string;
  endTime?: string;
  allDay: boolean;
};

interface Props {
  closeModal: () => void;
  addEvent: (event: EventInput) => void;
  selectedDate: SelectedDate;
}

const timePickerFormat = 'HH:mm';

export default function ScheduleForm({
  closeModal,
  addEvent,
  selectedDate,
}: Props) {
  const [allDay, setAllDay] = useState(selectedDate.allDay);
  const [form] = Form.useForm();
  const titleInputRef = useRef<InputRef>(null);

  const formatDate = (date: string, time?: string) => {
    return `${dayjs(date).format('YYYY-MM-DD')}T${dayjs(time).format('HH:mm')}`;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    addEvent({
      id: uuidv4(),
      title: values.title,
      start: allDay
        ? dayjs(values.startDate).format('YYYY-MM-DD')
        : formatDate(values.startDate, values.startTime),
      end: allDay
        ? dayjs(values.endDate).add(1, 'day').format('YYYY-MM-DD') // 캘린더 종료일이 하루 일찍 표시되는 문제 해결
        : formatDate(values.endDate, values.endTime),
      allDay,
    });
    closeModal();
    form.resetFields();
  };

  /** enter 눌려서 폼 제출하기 막기 */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Enter 키 눌림 동작을 막음
    }
  };

  useEffect(() => {
    titleInputRef.current?.focus(); // 렌더시 제목 입력창에 포커스
  }, []);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
      layout="vertical"
      autoComplete="off"
      initialValues={{
        startDate: dayjs(selectedDate.startDate),
        startTime: dayjs(selectedDate.startDate),
        endDate: selectedDate.allDay
          ? dayjs(selectedDate.endDate).subtract(1, 'day') // 캘린더 종료일이 하루 늦게 표시되는 문제 해결
          : dayjs(selectedDate.endDate),
        endTime: dayjs(selectedDate.endDate),
        allDay,
      }}
      onKeyDown={handleKeyDown}
    >
      <Row>
        <Form.Item<FieldType>
          name="title"
          className="mb-0"
          rules={[{ required: true, message: '제목을 입력해 주세요.' }]}
        >
          <Input
            placeholder="제목을 입력해 주세요."
            ref={titleInputRef}
            style={{
              border: 'none',
              borderBottom: '1px solid #d9d9d9',
              borderRadius: 0,
            }}
            className="focus:shadow-none"
            size="large"
          />
        </Form.Item>
      </Row>

      <Row icon={<ClockCircleOutlined />}>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <Form.Item<FieldType> name="startDate" className="mb-0">
              <DatePicker allowClear={false} />
            </Form.Item>
            {!allDay && (
              <Form.Item<FieldType> name="startTime" className="mb-0">
                <TimePicker
                  format={timePickerFormat}
                  minuteStep={10}
                  allowClear={false}
                />
              </Form.Item>
            )}
          </div>
          <div>~</div>
          <div className="flex gap-2">
            <Form.Item<FieldType> name="endDate" className="mb-0">
              <DatePicker allowClear={false} />
            </Form.Item>
            {!allDay && (
              <Form.Item<FieldType> name="endTime" className="mb-0">
                <TimePicker
                  allowClear={false}
                  format={timePickerFormat}
                  minuteStep={10}
                />
              </Form.Item>
            )}
          </div>
        </div>
      </Row>
      <Row>
        <Form.Item<FieldType>
          name="allDay"
          className="mb-0"
          valuePropName="checked"
        >
          <div className="flex items-center gap-2">
            <span>종일</span>
            <Switch onChange={setAllDay} checked={allDay} />
          </div>
        </Form.Item>
      </Row>

      <div className="flex justify-end gap-5">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}
