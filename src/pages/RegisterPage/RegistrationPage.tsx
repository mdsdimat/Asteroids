// Core
import React from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router";

// Components
import RegistrationForm from './RegistrationForm/RegistrationForm';
import { useForm } from 'antd/es/form/Form';
import { Button, Card, Col, Form, Row, Space } from 'antd';

// Types
import { SignUpRequest } from '../../types/types';

// Api
import AuthApi from "../../api/AuthApi";

// Helpers
import { openNotificationWithIcon } from "@helpers/NotificationHelper";

const RegistrationPage: React.FC = () => {
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
  }
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
          <Card title='Регистрация'>
            <RegistrationForm />
            <Space>
              <Button type={'primary'} htmlType={'submit'}>
                Регистрация
              </Button>
              <Link to={'./login'}>
                <Button htmlType={'button'}>
                  Войти
                </Button>
              </Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </Form>
  )
};

// Exports
export default RegistrationPage;