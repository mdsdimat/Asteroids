import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import { Layout, Menu } from 'antd';

import ProfileForm from './components/ProfileForm';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  return (
      <>
        <Layout>
          <Router>
            <Header>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1">
                    Играть
                    <Link to="/" />
                  </Menu.Item>
                  <Menu.Item key="2">
                    Регистрация
                    <Link to="/register" />
                  </Menu.Item>
                  <Menu.Item key="3">
                    Профиль
                    <Link to="/profile" />
                  </Menu.Item>
                  <Menu.Item key="4">
                    Доска почета
                    <Link to="/dashboard" />
                  </Menu.Item>
              </Menu>
            </Header>
            <Content>
              <Switch>
                <Route path="/" exact>Главная она же страница игры</Route>
                  <Route path="/login" component={LoginForm} />
                  <Route path="/register" component={RegistrationForm} />
                  <Route path="/profile" component={ProfileForm}>Профиль</Route>
                  <Route path="/dashboard">Доска</Route>
                  <Route>
                    <Redirect to="/login" />
                  </Route>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Game &copy; 2020 Created by Helsinki</Footer>
          </Router>
        </Layout>
      </>
  )
}

export default App;
