import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Input, Button, Row, Col, Card,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useHistory } from 'react-router';
import AuthApi from '../../api/AuthApi';
import { SignUser } from '../../types/types';
import { openNotificationWithIcon } from '../../helpers/NotificationHelper';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = (): JSX.Element => {
  const [form] = useForm();
  const history = useHistory();

  const onFinish = (values: SignUser) => {
    AuthApi.signIn(values)
      .then(() => {
        openNotificationWithIcon('success', 'Успех', '');
        history.push('/');
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'Ошибка', err.response.data.reason);
      });
  };

  const toRegistration = () => {
    history.push('/registration');
  };

  useEffect(() => {
    AuthApi.getUser()
      .then(() => {
        history.push('/');
      })
      .catch(() => {
      });
  });

  return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
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
                <Button htmlType="button" onClick={toRegistration}>
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
