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
  Tooltip,
  Badge,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const MatrixList = () => {
  const [form] = Form.useForm();

  // 模拟数据
  const matrixData = [
    {
      key: "1",
      id: 1,
      name: "网络运维责任矩阵",
      department: "网络部",
      createTime: "2023-01-15",
      updateTime: "2023-05-20",
      status: "已发布",
      roles: ["网络工程师", "运维主管", "网络架构师"],
      tasks: ["网络监控", "故障处理", "性能优化", "安全管理"],
    },
    {
      key: "2",
      id: 2,
      name: "业务发展责任矩阵",
      department: "业务部",
      createTime: "2023-02-20",
      updateTime: "2023-06-15",
      status: "已发布",
      roles: ["业务经理", "市场专员", "销售主管"],
      tasks: ["市场调研", "客户开发", "产品推广", "销售管理"],
    },
    {
      key: "3",
      id: 3,
      name: "客户服务责任矩阵",
      department: "客服部",
      createTime: "2023-03-10",
      updateTime: "2023-07-05",
      status: "草稿",
      roles: ["客服主管", "客服专员", "技术支持"],
      tasks: ["客户咨询", "投诉处理", "服务跟进", "满意度调查"],
    },
    {
      key: "4",
      id: 4,
      name: "数据分析责任矩阵",
      department: "数据部",
      createTime: "2023-04-05",
      updateTime: "2023-08-10",
      status: "已发布",
      roles: ["数据分析师", "数据工程师", "数据科学家"],
      tasks: ["数据采集", "数据清洗", "数据分析", "报告生成"],
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
      title: "矩阵名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "所属部门",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "角色数量",
      key: "roleCount",
      render: (_text: string, record: any) => record.roles.length,
    },
    {
      title: "任务数量",
      key: "taskCount",
      render: (_text: string, record: any) => record.tasks.length,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
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
        <Badge status={text === "已发布" ? "success" : "default"} text={text} />
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, _record: any) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} size="small">
            查看
          </Button>
          <Button type="text" icon={<EditOutlined />} size="small">
            编辑
          </Button>
          <Button type="text" danger icon={<DeleteOutlined />} size="small">
            删除
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
        items={[{ title: "首页" }, { title: "责任矩阵" }]}
        style={{ marginBottom: 16 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ marginRight: 8 }}>责任矩阵</h1>
          <Tooltip title="责任矩阵用于明确各角色在不同任务中的职责和权限">
            <QuestionCircleOutlined style={{ color: "#1677ff" }} />
          </Tooltip>
        </div>
        <Space>
          <Button icon={<ExportOutlined />}>导出数据</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link to="/matrix/new">新增责任矩阵</Link>
          </Button>
        </Space>
      </div>

      <Card>
        <Form
          form={form}
          name="matrix_search"
          layout="horizontal"
          onFinish={handleSearch}
          style={{ marginBottom: 24 }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="matrixName" label="矩阵名称">
                <Input placeholder="搜索矩阵名称" prefix={<SearchOutlined />} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="department" label="所属部门">
                <Select placeholder="全部" allowClear>
                  <Option value="all">全部</Option>
                  <Option value="network">网络部</Option>
                  <Option value="business">业务部</Option>
                  <Option value="service">客服部</Option>
                  <Option value="data">数据部</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="全部" allowClear>
                  <Option value="all">全部</Option>
                  <Option value="published">已发布</Option>
                  <Option value="draft">草稿</Option>
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
          dataSource={matrixData}
          pagination={{
            total: matrixData.length,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default MatrixList;
