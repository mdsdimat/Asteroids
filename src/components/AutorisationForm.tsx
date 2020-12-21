//core
import React from "react";
import {Button, Card, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";
import {useHistory} from "react-router";

interface FormProps {
    id: string;
    userName?: string;
    password?: string;
}

const AuthorizationForm: React.FC<FormProps> = ({
    children,
    id,
    password,
    userName
}) => {
    const [passwordSeen, setPasswordSeen] = React.useState<boolean>(false)
    const [form] = useForm();
    const history = useHistory();

    const extra = (
        <Button
            type={"primary"}
            htmlType={"button"}
            onClick={() => setPasswordSeen(!passwordSeen)}
        >
            {passwordSeen ? "Скрыть пароль" : "Показать пароль"}
        </Button>
    )

    const onSubmit = (data: User) => {
        UserApi.signIn(data).then((response) => {
            context.setUser(response);
            history.push('/');
        })
        .catch((err) => {
            if (err.field) {

            }
        })
    }

    return (
        <Form
            onFinish={(v) => {console.log(v)}}
            layout={'vertical'}
            hideRequiredMark
            initialValues={{password, userName}}
            form={form}
        >
            <Card title={'Форма авторизации'} extra={extra}>
                <Form.Item
                    name={'userName'}
                    rules={[{required: true, message: "Нужен логин!"}]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'password'}
                    rules={[{required: true, message: "Без пароля не пройдёшь"}]}>
                    {passwordSeen?
                        <Input /> :
                        <Input.Password/>
                    }
                </Form.Item>
                <Button htmlType={'submit'}>login</Button>
            </Card>
        </Form>
    )
}

//Exports
export default AuthorizationForm;
