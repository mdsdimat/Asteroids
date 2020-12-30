// Core
import React from 'react';

// Components
import { Form, Input } from 'antd';


const LoginForm = (): JSX.Element => (
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
  </>
);

// Exports
export default LoginForm;
