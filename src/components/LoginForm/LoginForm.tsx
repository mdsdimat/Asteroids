import React from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Input, Button, Row, Col, Card,
} from 'antd';
import { useForm } from 'antd/es/form/Form';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = (): JSX.Element => {
  const [form] = useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      hideRequiredMark
      form={form}
    >
      <Row>
        <Col span={12} offset={6}>
          <Card title="Авторизация">
            <Form.Item
              label="Логин"
              name="login"
              rules={[{ required: true, message: 'Заполните поле!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Заполните поле!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Link to="/register">
                <Button htmlType="button">
                  Нет аккаунта?
                </Button>
              </Link>
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
