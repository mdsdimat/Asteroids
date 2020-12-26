import React, { useState, useEffect } from "react";
import {Redirect} from 'react-router-dom';

import {Avatar, Form, Input, Button, Row, Col, Card, Select} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {useForm} from "antd/es/form/Form";

import AuthApi from "../../api/AuthApi";
import UserApi from "../../api/UserApi";

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

    const [avatar, setAvatar] = useState('');

    useEffect(() => {
      AuthApi.getUser().then(r => {
        setAvatar('https://ya-praktikum.tech' + r.avatar);

        form.setFieldsValue({
          first_name: r.first_name,
          second_name: r.second_name,
          display_name: r.display_name,
          login: r.login,
          phone: r.phone,
          email: r.email,
        });
      }).catch(error => {
        console.log(error);
      });
    });

    const onFinish = (values: any) => {
        console.log('Success:', values);
        UserApi.editProfile(values);

        if(values.oldPassword && values.newPassword) {
          UserApi.changePassword({
            oldPassword : values.oldPassword,
            newPassword: values.newPassword
          });
        }
    };

    const onAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) : void => {
      if(e.target.files) {
        UserApi.uploadAvatar(e.target.files[0]);
      }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const toMain = () => {
        return <Redirect to="/" />
    }

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
                      {avatar ? <Avatar shape="square" size={64}  src={avatar} /> : <Avatar shape="square" size={64} icon={<UserOutlined />} />}
                    	<Form.Item
                            label="Аватар"
                            name="avatar"
                        >
                            <Input type="file" onChange={onAvatarUpload}/>
                        </Form.Item>
                        <Form.Item
                            label="Отображаемое имя"
                            name="display_name"
                            rules={[{required: true, message: 'Заполните поле!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Имя"
                            name="first_name"
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
                            <Input maxLength={12}/>
                        </Form.Item>

                        <Form.Item
                            label="Старый пароль"
                            name="oldPassword"
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            label="Новый пароль"
                            name="newPassword"
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                        	<Button htmlType="button" onClick={toMain}>
                                Назад
                            </Button>
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