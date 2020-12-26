import React from "react";
import { Redirect, Link } from 'react-router-dom';

import {Avatar, Form, Input, Button, Row, Col, Card, Select} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {useForm} from "antd/es/form/Form";

const {Option} = Select;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const ProfileForm = () => {
    const [form] = useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const toMain = () => {
        return <Redirect to="/" />
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}}>
                <Option value="375">+375</Option>
                <Option value="7">+7</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout={'vertical'}
            hideRequiredMark
            form={form}
        >
            <Row>
                <Col span={12} offset={6}>
                    <Card title={'Профиль пользователя'}>
                    	<Avatar shape="square" size={64} icon={<UserOutlined />} />
                    	<Form.Item
                            label="Аватар"
                            name="avatar"
                        >                        	
                            <Input type="file"/>
                        </Form.Item>
                        <Form.Item
                            label="Имя"
                            name="name"
                            rules={[{required: true, message: 'Заполните поле!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Фамилия"
                            name="second_name"
                            rules={[{required: true, message: 'Заполните поле!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Логин"
                            name="login"
                            rules={[{required: true, message: 'Заполните поле!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Почта"
                            name="email"
                            rules={[{required: true, type: 'email', message: 'Неверный email'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Телефон"
                            name="phone"
                            rules={[{required: true, message: 'Заполните поле!'}]}
                        >
                            <Input maxLength={9} addonBefore={prefixSelector}/>
                        </Form.Item>

                        <Form.Item
                            label="Пароль"
                            name="password"
                            rules={[{required: true, message: 'Введите пароль!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                          <Link to="/">
                        	  <Button htmlType="button" onClick={toMain}>
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