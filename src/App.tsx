import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import { Layout, Menu, Col } from 'antd';

import ProfileForm from './components/ProfileForm';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Leaderboard from './components/Leaderboard/Leaderboard';

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Router>
          <Col span={12} offset={6}>
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  Играть
                  <Link to="/" />
                </Menu.Item>
                <Menu.Item key="2">
                  Вход
                  <Link to="/login" />
                </Menu.Item>
                <Menu.Item key="3">
                  Регистрация
                  <Link to="/register" />
                </Menu.Item>
                <Menu.Item key="4">
                  Профиль
                  <Link to="/profile" />
                </Menu.Item>
                <Menu.Item key="5">
                  Доска почета
                  <Link to="/dashboard" />
                </Menu.Item>
            </Menu>
          </Header>
          </Col>
          <Content>
            <Switch>
              <Route path="/" exact>Главная она же страница игры</Route>
                <Route path="/login" component={LoginForm} exact />
                <Route path="/register" component={RegistrationForm} exact />
                <Route path="/profile" component={ProfileForm} exact />
                <Route path="/dashboard" component={Leaderboard} exact />
                <Redirect to="/login" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Game &copy; 2020 Created by Helsinki</Footer>
        </Router>
      </Layout>
    </>
  )
}

export default App;
