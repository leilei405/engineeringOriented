import React, { useState } from "react";
import {
  Breadcrumb,
  Tabs,
  Card,
  Button,
  Input,
  Select,
  Table,
  Tag,
  Space,
} from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  ApiOutlined,
  SearchOutlined,
  PlayCircleOutlined,
  CodeOutlined,
  FileTextOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "./ApiPage.module.scss";

const { TabPane } = Tabs;
const { Option } = Select;

const ApiPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const apiCategories = [
    { key: "all", tab: "全部" },
    { key: "user", tab: "用户管理" },
    { key: "product", tab: "产品管理" },
    { key: "order", tab: "订单管理" },
    { key: "system", tab: "系统管理" },
  ];

  const apiList = [
    {
      id: "get-users",
      name: "获取用户列表",
      method: "GET",
      path: "/api/users",
      category: "user",
      status: "active",
      description: "获取系统中的用户列表，支持分页、排序和筛选",
    },
    {
      id: "get-user",
      name: "获取用户详情",
      method: "GET",
      path: "/api/users/:id",
      category: "user",
      status: "active",
      description: "根据用户ID获取用户详细信息",
    },
    {
      id: "create-user",
      name: "创建用户",
      method: "POST",
      path: "/api/users",
      category: "user",
      status: "active",
      description: "创建新用户，需要提供用户名、密码等信息",
    },
    {
      id: "update-user",
      name: "更新用户",
      method: "PUT",
      path: "/api/users/:id",
      category: "user",
      status: "active",
      description: "更新指定用户的信息",
    },
    {
      id: "delete-user",
      name: "删除用户",
      method: "DELETE",
      path: "/api/users/:id",
      category: "user",
      status: "active",
      description: "删除指定用户",
    },
    {
      id: "get-products",
      name: "获取产品列表",
      method: "GET",
      path: "/api/products",
      category: "product",
      status: "active",
      description: "获取系统中的产品列表，支持分页、排序和筛选",
    },
    {
      id: "get-product",
      name: "获取产品详情",
      method: "GET",
      path: "/api/products/:id",
      category: "product",
      status: "active",
      description: "根据产品ID获取产品详细信息",
    },
    {
      id: "create-product",
      name: "创建产品",
      method: "POST",
      path: "/api/products",
      category: "product",
      status: "active",
      description: "创建新产品，需要提供产品名称、价格等信息",
    },
    {
      id: "get-orders",
      name: "获取订单列表",
      method: "GET",
      path: "/api/orders",
      category: "order",
      status: "active",
      description: "获取系统中的订单列表，支持分页、排序和筛选",
    },
    {
      id: "get-order",
      name: "获取订单详情",
      method: "GET",
      path: "/api/orders/:id",
      category: "order",
      status: "active",
      description: "根据订单ID获取订单详细信息",
    },
  ];

  const filteredApis = searchValue
    ? apiList.filter(
        (api) =>
          api.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          api.path.toLowerCase().includes(searchValue.toLowerCase()) ||
          api.description.toLowerCase().includes(searchValue.toLowerCase())
      )
    : apiList;

  const columns = [
    {
      title: "API名称",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <Link to={`/api/${record.id}`} className={styles.apiName}>
          {text}
        </Link>
      ),
    },
    {
      title: "请求方法",
      dataIndex: "method",
      key: "method",
      render: (method: string) => {
        let color = "";
        switch (method) {
          case "GET":
            color = "green";
            break;
          case "POST":
            color = "blue";
            break;
          case "PUT":
            color = "orange";
            break;
          case "DELETE":
            color = "red";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{method}</Tag>;
      },
    },
    {
      title: "接口路径",
      dataIndex: "path",
      key: "path",
      render: (path: string) => <code className={styles.apiPath}>{path}</code>,
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category",
      render: (category: string) => {
        const categoryMap: Record<string, string> = {
          user: "用户管理",
          product: "产品管理",
          order: "订单管理",
          system: "系统管理",
        };
        return <span>{categoryMap[category] || category}</span>;
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return status === "active" ? (
          <Tag color="success">已发布</Tag>
        ) : (
          <Tag color="default">未发布</Tag>
        );
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, _record: any) => (
        <Space size="small">
          <Button type="text" icon={<PlayCircleOutlined />} size="small">
            调试
          </Button>
          <Button type="text" icon={<FileTextOutlined />} size="small">
            文档
          </Button>
          <Button type="text" icon={<CodeOutlined />} size="small">
            代码
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.apiPage}>
      <div className="container">
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined /> 首页
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <ApiOutlined /> 在线接口
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>在线接口</h1>
          <p className={styles.pageDescription}>
            RESTful API接口管理平台，支持在线调试、文档生成和Mock数据
          </p>
        </div>

        <Card className={styles.apiCard}>
          <div className={styles.apiToolbar}>
            <div className={styles.apiSearch}>
              <Input
                placeholder="搜索API..."
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Select defaultValue="all" style={{ width: 120 }}>
                <Option value="all">全部方法</Option>
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
                <Option value="PUT">PUT</Option>
                <Option value="DELETE">DELETE</Option>
              </Select>
            </div>
            <div className={styles.apiActions}>
              <Button type="primary" icon={<PlusOutlined />}>
                新建接口
              </Button>
              <Button icon={<SettingOutlined />}>批量操作</Button>
            </div>
          </div>

          <Tabs defaultActiveKey="all" className={styles.apiTabs}>
            {apiCategories.map((category) => (
              <TabPane tab={category.tab} key={category.key}>
                <Table
                  columns={columns}
                  dataSource={filteredApis
                    .filter(
                      (api) =>
                        category.key === "all" || api.category === category.key
                    )
                    .map((api) => ({ ...api, key: api.id }))}
                  pagination={{ pageSize: 10 }}
                  className={styles.apiTable}
                />
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ApiPage;
