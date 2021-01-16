// Core
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { useForm } from 'antd/es/form/Form';
import {
  Button, Card, Col, Form, Row, Space,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './LoginForm/LoginForm';

// Types
import { SignUser } from '../../types/types';

// Helpers
import useAuth from '../../hooks/useAuth';
import { login } from '../../store/actionCreators/auth';
import authSelector from '../../store/selectors/auth';

const LoginPage: React.FC = () => {
  const [form] = useForm();

  const dispatch = useDispatch();

  const [authUser] = useAuth();

  const selector = useSelector(authSelector);

  const onFinish = (values: SignUser) => {
    dispatch(login(values));
  };

  React.useEffect(() => {
    authUser();
  }, [selector]);

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      layout="vertical"
      hideRequiredMark
      form={form}
    >
      <Row>
        <Col span={12} offset={6}>
          <Card title="Авторизация">
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
  );
};

// Exports
export default LoginPage;
