import React from "react";
import {Col, Layout, Menu} from "antd";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Content, Footer, Header} from "antd/es/layout/layout";

const PageLayout: React.FC = ({ children }) => (
  <Layout>
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
          <Menu.Item key="6">
            Форум
            <Link to="/forum" />
          </Menu.Item>
        </Menu>
      </Header>
    </Col>
    <Content>
      {children}

    </Content>
    <Footer style={{ textAlign: 'center' }}>Game &copy; 2020 Created by Helsinki</Footer>
  </Layout>
);

// Exports
export default PageLayout;