import React, {Component} from "react";
import {Modal, Form, Input, Button} from 'antd';
import useHttp from "../class/useHttpClass";

export default class Auth extends Component {

    constructor() {
        super();
        this.httpRequest = new useHttp();
        this.state = {
            visible: false,
            confirmLoading: false,
            email: '',
            password: '',
            loading: false,
        };
    }

    showModal() {
        this.setState({
            visible: !this.state.visible,
        });
        console.log('You are call fucking me!')
    }

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.props.open = false;
    };

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    changeVisible(){

    }

    registerHandler = async () => {
        try {
            this.data = await this.httpRequest.request('api/auth/register', 'POST', {...this.state})
            if (this.data.message) {
                // NotificationManager.success('Success Sign Up', 'Success')
            }
        } catch (e) {
            this.props.error(e)
        }
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    render() {
        const {visible, confirmLoading, loading} = this.state;
        return (
            <Modal
                title="Sign up"
                visible={this.props.open}
                onOk={this.registerHandler}
                confirmLoading={confirmLoading}
                onCancel={this.props.close}
                footer={[
                    <Button key="back" onClick={this.props.close}>
                        Close
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={this.registerHandler}>
                        Sign up
                    </Button>,
                ]}
            >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.loginHandler}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input id="email" name="email" onChange={this.changeHandler}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password id="password" name="password" onChange={this.changeHandler}/>
                    </Form.Item>
                </Form>
            </Modal>

        )
    }

}

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
