// Core
import React from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router";


// Components
import LoginForm from './LoginForm/LoginForm';
import { useForm } from 'antd/es/form/Form';
import { Button, Card, Col, Form, Row, Space } from 'antd';

// Types
import { SignUser } from '../../types/types';

// Api
import AuthApi from "../../api/AuthApi";

// Helpers
import {openNotificationWithIcon} from "@helpers/NotificationHelper";

const LoginPage: React.FC = () => {
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

  return (
    <Form
      name='basic'
      onFinish={onFinish}
      layout='vertical'
      hideRequiredMark
      form={form}
    >
      <Row>
        <Col span={12} offset={6}>
          <Card title='Авторизация'>
            <LoginForm />
            <Space>
              <Link to="/register">
                <Button htmlType="button">
                  Нет аккаунта?
                </Button>
              </Link>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Form>
  )
};

// Exports
export default LoginPage;