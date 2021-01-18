import React from 'react';
import {
  Col, Divider, Row, Input, Form, Button,
} from 'antd';
import { useForm } from 'antd/es/form/Form';

const { TextArea } = Input;

const data = [
  {
    id: 1,
    text: 'Сообщение пользателя холивар холивар холивар.',
  },
  {
    id: 2,
    text: 'Сообщение пользателя холивар холивар холивар.',
  },
  {
    id: 3,
    text: 'Сообщение пользателя холивар холивар холивар.',
  },
];

const ForumPage: React.FC = () => {
  const [form] = useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const renderData = () => data.map((message): JSX.Element => (
    <div key={message.id}>
      <p>
        {message.text}
      </p>
      <Divider />
    </div>
  ));

  return (
    <Row>
      <Col span={12} offset={6}>
        {renderData()}
        <Form
          name="basic"
          onFinish={onFinish}
          layout="vertical"
          hideRequiredMark
          form={form}
        >
          <Form.Item name="message">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>

        </Form>
      </Col>
    </Row>
  );
};

export default ForumPage;
