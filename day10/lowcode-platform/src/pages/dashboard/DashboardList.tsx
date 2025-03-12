import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Row,
  Col,
  Input,
  Select,
  Form,
  Space,
  Breadcrumb,
  Tag,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const DashboardList = () => {
  const [form] = Form.useForm();

  // 模拟数据
  const dashboardsData = [
    {
      id: 1,
      name: "网络运行监控大屏",
      period: "实时",
      scope: "全省",
      updateTime: "2023-12-01",
      status: "启用",
    },
    {
      id: 2,
      name: "业务发展情况大屏",
      period: "月度",
      scope: "全省",
      updateTime: "2023-11-15",
      status: "启用",
    },
    {
      id: 3,
      name: "用户分布情况大屏",
      period: "季度",
      scope: "全省",
      updateTime: "2023-10-30",
      status: "启用",
    },
  ];

  const handleSearch = (values: any) => {
    console.log("搜索条件:", values);
  };

  return (
    <div>
      <Breadcrumb
        items={[{ title: "首页" }, { title: "大屏管理" }]}
        style={{ marginBottom: 16 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1>大屏管理</h1>
        <Space>
          <Button icon={<ExportOutlined />}>导出数据</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link to="/dashboards/new">新增大屏</Link>
          </Button>
        </Space>
      </div>

      <Form
        form={form}
        name="dashboard_search"
        layout="inline"
        onFinish={handleSearch}
        style={{ marginBottom: 24 }}
      >
        <Form.Item name="dashboardName" label="大屏名称">
          <Input
            placeholder="搜索大屏名称"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
        </Form.Item>
        <Form.Item name="periodType" label="数据期间">
          <Select placeholder="全部" style={{ width: 150 }} allowClear>
            <Option value="all">全部</Option>
            <Option value="realtime">实时</Option>
            <Option value="daily">日</Option>
            <Option value="monthly">月</Option>
            <Option value="quarterly">季</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select placeholder="全部" style={{ width: 150 }} allowClear>
            <Option value="all">全部</Option>
            <Option value="active">启用</Option>
            <Option value="inactive">停用</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>

      <Row gutter={[16, 16]}>
        {dashboardsData.map((dashboard) => (
          <Col xs={24} sm={12} md={8} key={dashboard.id}>
            <Card
              cover={
                <div
                  style={{
                    height: 180,
                    background: "#1E0047",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {dashboard.id === 1 ? (
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%9B%BE%E7%89%871-V68W2Xop5LXSo5BuDfncBnWF0ophbc.png"
                      alt={dashboard.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <DashboardOutlined
                      style={{
                        fontSize: 48,
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    />
                  )}
                </div>
              }
              actions={[
                <Button type="text" icon={<EyeOutlined />} key="preview">
                  预览
                </Button>,
                <Button type="text" icon={<EditOutlined />} key="edit">
                  编辑
                </Button>,
              ]}
            >
              <Card.Meta
                title={dashboard.name}
                description={
                  <Space direction="vertical" size={4}>
                    <div>
                      <Tag color="blue">{dashboard.period}</Tag>
                      <Tag color="purple">{dashboard.scope}</Tag>
                    </div>
                    <div>更新时间: {dashboard.updateTime}</div>
                    <div>
                      状态:{" "}
                      <Tag
                        color={
                          dashboard.status === "启用" ? "success" : "error"
                        }
                      >
                        {dashboard.status}
                      </Tag>
                    </div>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardList;
