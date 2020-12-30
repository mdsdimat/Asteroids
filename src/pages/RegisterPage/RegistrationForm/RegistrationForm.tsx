// Core
import React from 'react';

// Components
import { Form, Input} from 'antd';
import PhonePrefixSelector from "@components/PhonePrefixSelector";

const PrefixSelector = (
  <Form.Item name="prefix" noStyle>
    <PhonePrefixSelector/>
  </Form.Item>
);

const RegistrationForm: React.FC = () => (
  <>
    <Form.Item
      label="Имя"
      name="name"
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
      <Input maxLength={9} addonBefore={PrefixSelector} />
    </Form.Item>

    <Form.Item
      label="Пароль"
      name="password"
      rules={[{ required: true, message: 'Введите пароль!' }]}
    >
      <Input.Password />
    </Form.Item>
  </>
);

// Exports
export default RegistrationForm;
