import React from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Input, Button, Row, Col, Card, Select,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useHistory } from 'react-router';
import AuthApi from '../../api/AuthApi';
import { SignUpRequest } from '../../types/types';
import { openNotificationWithIcon } from '../../helpers/NotificationHelper';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const RegistrationForm = (): JSX.Element => {
  const [form] = useForm();
  const history = useHistory();

  const onFinish = (values: SignUpRequest) => {
    AuthApi.signUp(values)
      .then(() => {
        openNotificationWithIcon('success', 'Успех', 'Пользователь успешно создан!');
        history.push('/');
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'Ошибка', err.response.data.reason);
      });
  };

  const toLogin = () => {
    history.push('/login');
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 100 }}>
        <Option value="375">+375</Option>
        <Option value="7">+7</Option>
      </Select>
    </Form.Item>
  );

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
          <Card title="Регистрация">
            <Form.Item
              label="Имя"
              name="first_name"
              rules={[{ required: true, message: 'Заполните поле!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Фамилия"
              name="second_name"
              rules={[{ required: true, message: 'Заполните поле!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Логин"
              name="login"
              rules={[{ required: true, message: 'Заполните поле!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Почта"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Неверный email' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Телефон"
              name="phone"
              rules={[{ required: true, message: 'Заполните поле!' }]}
            >
              <Input maxLength={9} addonBefore={prefixSelector} />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Введите пароль!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Регистрация
              </Button>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Link to="/login">
                <Button htmlType="button" onClick={toLogin}>
                  Войти
                </Button>
              </Link>
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default RegistrationForm;
