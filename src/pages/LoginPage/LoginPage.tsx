// Core
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import LoginForm from './LoginForm/LoginForm';
import { useForm } from 'antd/es/form/Form';
import { Button, Card, Col, Form, Row, Space } from 'antd';

// Types
import { SignUpRequest } from '../../types/types';

const LoginPage: React.FC = () => {
  const [form] = useForm();

  const handleOk = React.useCallback((values: SignUpRequest) => {
    console.log('succeeded:', values)
  }, [])

  return (
    <Form
      name='basic'
      onFinish={handleOk}
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