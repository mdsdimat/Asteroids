// Core
import React from 'react';

// Components
/*import { Avatar, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';*/

// Api
import UserApi from '../../../api/UserApi';

// Types
export interface ProfileFormProps {
  avatar: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  avatar,
}) => {
  const onAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    if (e.target.files) {
      UserApi.uploadAvatar(e.target.files[0]);
    }
  };

  return (
    <>
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
    </>
  );
};

export default ProfileForm;
