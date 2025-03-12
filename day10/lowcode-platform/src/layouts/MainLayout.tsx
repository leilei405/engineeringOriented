"use client";

import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu, theme, Button } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  TableOutlined,
  AreaChartOutlined,
  TeamOutlined,
  ClusterOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: <Link to="/">系统概览</Link>,
    },
    {
      key: "/indicators",
      icon: <AppstoreOutlined />,
      label: <Link to="/indicators">指标管理</Link>,
    },
    {
      key: "/tables",
      icon: <TableOutlined />,
      label: <Link to="/tables">表格管理</Link>,
    },
    {
      key: "/charts",
      icon: <AreaChartOutlined />,
      label: <Link to="/charts">图示管理</Link>,
    },
    {
      key: "/dashboards",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboards">大屏管理</Link>,
    },
    {
      key: "/teams",
      icon: <TeamOutlined />,
      label: <Link to="/teams">团队管理</Link>,
    },
    {
      key: "/matrix",
      icon: <ClusterOutlined />,
      label: <Link to="/matrix">责任矩阵</Link>,
    },
    {
      key: "/templates",
      icon: <FileTextOutlined />,
      label: <Link to="/templates">文件模版</Link>,
    },
  ];

  // 获取当前路径的第一级路径作为选中的菜单项
  const selectedKey = "/" + location.pathname.split("/")[1];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
      >
        <div className="logo">{!collapsed && "数据指标系统"}</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["/"]}
          selectedKeys={[selectedKey]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: 24,
            }}
          >
            <Button icon={<SettingOutlined />}>系统设置</Button>
          </div>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          数据指标与可视化管理系统 ©{new Date().getFullYear()} 版权所有
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
