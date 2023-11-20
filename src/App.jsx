import { useEffect, useState } from 'react';
import './App.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LockOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Modal, Input, Checkbox, Form } from 'antd';
import ContentPage from '../components/ContentPage'
import { logIn, getVideos, signUp } from './apis/mock-data/database';
import Videos from '../components/Videos';

const App = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [listVideos, setListVideos] = useState([]);
  const handleLogin = () => {
    logIn(user, password).then(res => {
      localStorage.setItem('token', JSON.stringify(res));
      setToken(res.token)
      setLoggedIn(!!(JSON.parse(localStorage.getItem('token'))))
      setIsModalLoginOpen(false)

    });
  };
  useEffect(() => {
    const login = JSON.parse(localStorage.getItem('token'));
    if (login) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      setIsModalLoginOpen(true)
    }
  }, [])

  useEffect(() => {
    getVideos(token).then((res) => setListVideos(res.videos));
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalMyVideos, setIsModalMyVideos] = useState(false);
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const handleCancel = () => {
    setIsModalLoginOpen(false);
    setIsModalRegisterOpen(false)
    setIsModalMyVideos(false)
  };

  const handleOpenRegisterModal = () => {
    setIsModalLoginOpen(false)
    setIsModalRegisterOpen(true)
  }
  const handleOpenLoginModal = () => {
    setIsModalLoginOpen(true)
    setIsModalRegisterOpen(false)
  }
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const handleSignUp = async () => {
    if(password === comfirmPassword){
      try{
             const result = await signUp({username: newUser, password, role :2});
             setIsModalLoginOpen(true)
             setIsModalRegisterOpen(false)
     } catch(error){
             console.log('error',error)
         }
    } else{
      alert('Password not match')
    }
   }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100vh' }}
          items={
            loggedIn ?
              [{
                key: '1',
                icon: <UserOutlined />,
                label: JSON.parse(localStorage.getItem('token')).user.username || '',
                children: [{
                  key: '4',
                  icon: <LogoutOutlined />,
                  label: 'Logout',
                  onClick: () => {
                    setLoggedIn(false)
                    localStorage.removeItem('token')
                    setIsModalLoginOpen(true)
                  }
                }]
              },
              // {
              //   key: '2',
              //   icon: <VideoCameraOutlined />,
              //   label: 'nav 2',
              // },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'My Videos',
                onClick: () => {
                  setIsModalMyVideos(true)
                }
              },]
              :
              [{
                key: '1',
                icon: <LoginOutlined />,
                label: 'Login',
                onClick: () => {
                  setIsModalLoginOpen(true);
                }
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },]
          }
        />
        <Modal title="LogIn"
          closable={false}
          open={isModalLoginOpen}
          // onCancel={handleCancel}
          footer={null}
          // width='100%'
          style={{maxWidth:'100%', padding:0}}
        >
          <div
          //  style={{width: '30%'}}
           >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  onChange={e => setUser(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button"
                  onClick={handleLogin}
                >
                  Log in
                </Button>
                <div className='login-form-register'><span onClick={handleOpenRegisterModal}>Register now!</span></div>
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <Modal title='Register'
          open={isModalRegisterOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            name="normal_register"
            className="register-form"
            onFinish={onFinish}
          >
            <Form.Item
              name="newUser"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" 
                value={newUser}
                onChange={e => setNewUser(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="comfirm password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Comfirm Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Comfirm Password"
                value={comfirmPassword}
                onChange={e => setComfirmPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSignUp}>
                Register
              </Button>
              <div className='login-form-register'><span onClick={handleOpenLoginModal}>Log in</span></div>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          width='100%'
          height='100%'
          title="My Videos"
          onCancel={handleCancel}
          open={isModalMyVideos}
          cancelText="Đóng"
          okButtonProps={{style: {display: 'none'}}}
          style={{maxWidth:'100%', padding:0, height: '100vh', top: 0}}
          >
          <Videos 
          listVideos={listVideos}/>
        </Modal>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          Header
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ContentPage
            listVideos={listVideos} />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;