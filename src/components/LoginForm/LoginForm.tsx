// Core
import React from 'react';

// Components
import {
  Button, Form, Input, Space,
} from 'antd';
import { Link } from 'react-router-dom';
import { getOAuthUrl } from '@helpers/ApiHelpers';
import { openNotificationWithIcon } from '@helpers/NotificationHelper';
import AuthApi from '../../api/AuthApi';

const LoginForm = (): JSX.Element => {
  const oAuth = () => {
    AuthApi.getServiceId()
      .then((res) => {
        window.location.assign(getOAuthUrl(res.service_id));
      })
      .catch(() => {
        openNotificationWithIcon('error', 'Ошибка', 'Действие временно недоступно');
      });
  };
  return (

    <>
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
      <Space>
        <Link to="/register">
          <Button htmlType="button">
            Нет аккаунта?
          </Button>
        </Link>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
        <Button type="dashed" onClick={oAuth}>
          Войти через Яндекс
        </Button>
      </Space>
    </>
  );
};

// Exports
export default LoginForm;
