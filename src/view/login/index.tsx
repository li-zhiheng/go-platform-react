import loginStyle from '@/assets/style/login.module.less'
import { Button, Checkbox, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

    const { num } = useSelector((state: { num: number }) => ({
        num: state.num
    }))

    const dispatch = useDispatch()
    const changeNum = () => {
        dispatch({ type: 'multi', val: 2 })
    }

    return (
        <div className={loginStyle.login}>
            <div className={loginStyle.loginHeader}>
                <h1 onClick={changeNum}>后台管理系统{num}</h1>
                <div>登录页</div>
            </div>
            <div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{ required: true, message: '请输入账号!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}

export default Login