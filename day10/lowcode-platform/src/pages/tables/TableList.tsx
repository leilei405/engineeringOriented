import { Link } from "react-router-dom";
import {
  Button,
  Table,
  Space,
  Input,
  Select,
  Form,
  Row,
  Col,
  Card,
  Breadcrumb,
  Tag,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const TableList = () => {
  const [form] = Form.useForm();

  // 模拟数据
  const tablesData = [
    {
      key: "1",
      id: 1,
      name: "基站数量统计表",
      period: "月度",
      permission: "全部",
      updateTime: "2023-12-01",
      status: "启用",
    },
    {
      key: "2",
      id: 2,
      name: "网络覆盖情况表",
      period: "季度",
      permission: "省公司",
      updateTime: "2023-11-15",
      status: "启用",
    },
    {
      key: "3",
      id: 3,
      name: "用户分布情况表",
      period: "月度",
      permission: "全部",
      updateTime: "2023-10-30",
      status: "启用",
    },
  ];

  // 表格列定义
  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "表格名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "数据期间",
      dataIndex: "period",
      key: "period",
    },
    {
      title: "查看权限",
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <Tag color={text === "启用" ? "success" : "error"}>{text}</Tag>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, _record: any) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} size="small">
            预览
          </Button>
          <Button type="text" icon={<EditOutlined />} size="small">
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (values: any) => {
    console.log("搜索条件:", values);
    // 实际应用中这里会调用API进行搜索
  };

  return (
    <div>
      <Breadcrumb
        items={[{ title: "首页" }, { title: "表格管理" }]}
        style={{ marginBottom: 16 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1>表格管理</h1>
        <Space>
          <Button icon={<ExportOutlined />}>导出数据</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link to="/tables/new">新增表格</Link>
          </Button>
        </Space>
      </div>

      <Card>
        <Form
          form={form}
          name="table_search"
          layout="horizontal"
          onFinish={handleSearch}
          style={{ marginBottom: 24 }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="tableName" label="表格名称">
                <Input placeholder="搜索表格名称" prefix={<SearchOutlined />} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="periodType" label="数据期间">
                <Select placeholder="全部" allowClear>
                  <Option value="all">全部</Option>
                  <Option value="daily">日</Option>
                  <Option value="monthly">月</Option>
                  <Option value="quarterly">季</Option>
                  <Option value="yearly">年</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="全部" allowClear>
                  <Option value="all">全部</Option>
                  <Option value="active">启用</Option>
                  <Option value="inactive">停用</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: "flex", alignItems: "flex-end" }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Table
          columns={columns}
          dataSource={tablesData}
          pagination={{
            total: tablesData.length,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default TableList;
