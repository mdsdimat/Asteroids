import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Avatar, Form, Input, Button, Row, Col, Card,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';

import AuthApi from '../../api/AuthApi';
import UserApi from '../../api/UserApi';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface FormValues {
  first_name?: string,
  second_name?: string,
  display_name?: string,
  login?: string,
  phone?: string,
  email?: string,
  oldPassword?: string,
  newPassword?: string
}

const ProfileForm = (): JSX.Element => {
  const [form] = useForm();

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    AuthApi.getUser().then((user) => {
      setAvatar(`https://ya-praktikum.tech${user.avatar}`);

      form.setFieldsValue({
        first_name: user.first_name,
        second_name: user.second_name,
        display_name: user.display_name,
        login: user.login,
        phone: user.phone,
        email: user.email,
      });
    });
  });

  const onFinish = (values: FormValues) => {
    UserApi.editProfile(values);

    if (values.oldPassword && values.newPassword) {
      UserApi.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
    }
  };

  const onAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    if (e.target.files) {
      UserApi.uploadAvatar(e.target.files[0]);
    }
  };

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
          <Card title="Профиль пользователя">
            {avatar ? <Avatar shape="square" size={64} src={avatar} /> : <Avatar shape="square" size={64} icon={<UserOutlined />} />}
            <Form.Item
              label="Аватар"
              name="avatar"
            >
              <Input type="file" onChange={onAvatarUpload} />
            </Form.Item>
            <Form.Item
              label="Отображаемое имя"
              name="display_name"
              rules={[{ required: true, message: 'Заполните поле!' }]}
            >
              <Input />
            </Form.Item>
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
              <Input maxLength={12} />
            </Form.Item>

            <Form.Item
              label="Старый пароль"
              name="oldPassword"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Новый пароль"
              name="newPassword"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Link to="/">
                <Button htmlType="button">
                  На главную
                </Button>
              </Link>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileForm;
