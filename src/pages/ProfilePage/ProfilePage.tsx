// Core
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import {
  Button, Card, Col, Form, Row, Space,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import ProfileForm from './ProfileForm/ProfileForm';

// Types
import { PasswordRequest, UserResponse } from '../../types/types';

// Api
import AuthApi from '../../api/AuthApi';
import UserApi from '../../api/UserApi';

const ProfilePage: React.FC = () => {
  const [form] = useForm();
  const [avatar, setAvatar] = React.useState('');

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
    }).catch((error) => {
      console.log(error);
    });
  });

  const handleOk = React.useCallback((values: UserResponse & PasswordRequest) => {
    UserApi.editProfile(values);

    if (values.oldPassword && values.newPassword) {
      UserApi.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
    }
  }, []);

  return (
    <Form
      name="basic"
      onFinish={handleOk}
      layout="vertical"
      hideRequiredMark
      form={form}
    >
      <Row>
        <Col span={12} offset={6}>
          <Card title="Профиль пользователя">
            <ProfileForm avatar={avatar} />
            <Space>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
              <Link to="/">
                <Button htmlType="button">
                  На главную
                </Button>
              </Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

// Exports
export default ProfilePage;
