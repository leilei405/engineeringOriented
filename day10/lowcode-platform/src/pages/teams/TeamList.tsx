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
  Avatar,
  Tooltip,
  Dropdown,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Option } = Select;

const TeamList = () => {
  const [form] = Form.useForm();

  // 模拟数据
  const teamsData = [
    {
      key: "1",
      id: 1,
      name: "网络运维团队",
      leader: "张三",
      members: ["张三", "李四", "王五", "赵六", "钱七"],
      department: "网络部",
      createTime: "2023-01-15",
      status: "启用",
    },
    {
      key: "2",
      id: 2,
      name: "业务发展团队",
      leader: "李四",
      members: ["李四", "王五", "赵六"],
      department: "业务部",
      createTime: "2023-02-20",
      status: "启用",
    },
    {
      key: "3",
      id: 3,
      name: "客户服务团队",
      leader: "王五",
      members: ["王五", "赵六", "钱七", "孙八"],
      department: "客服部",
      createTime: "2023-03-10",
      status: "启用",
    },
    {
      key: "4",
      id: 4,
      name: "数据分析团队",
      leader: "赵六",
      members: ["赵六", "钱七", "孙八", "周九", "吴十"],
      department: "数据部",
      createTime: "2023-04-05",
      status: "停用",
    },
  ];

  // 下拉菜单项
  const dropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: "查看详情",
      icon: <EyeOutlined />,
    },
    {
      key: "2",
      label: "编辑团队",
      icon: <EditOutlined />,
    },
    {
      key: "3",
      label: "停用团队",
      icon: <DeleteOutlined />,
      danger: true,
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
      title: "团队名称",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Space>
          <TeamOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "团队负责人",
      dataIndex: "leader",
      key: "leader",
    },
    {
      title: "所属部门",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "团队成员",
      dataIndex: "members",
      key: "members",
      render: (members: string[]) => (
        <Avatar.Group
          maxCount={3}
          maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        >
          {members.map((member, index) => (
            <Tooltip title={member} key={index}>
              <Avatar style={{ backgroundColor: getAvatarColor(index) }}>
                {member.substring(0, 1)}
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
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
            查看
          </Button>
          <Button type="text" icon={<EditOutlined />} size="small">
            编辑
          </Button>
          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
            <Button type="text" icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // 生成随机头像颜色
  const getAvatarColor = (index: number) => {
    const colors = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae", "#87d068"];
    return colors[index % colors.length];
  };

  const handleSearch = (values: any) => {
    console.log("搜索条件:", values);
    // 实际应用中这里会调用API进行搜索
  };

  return (
    <div>
      <Breadcrumb
        items={[{ title: "首页" }, { title: "团队管理" }]}
        style={{ marginBottom: 16 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1>团队管理</h1>
        <Space>
          <Button icon={<ExportOutlined />}>导出数据</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link to="/teams/new">新增团队</Link>
          </Button>
        </Space>
      </div>

      <Card>
        <Form
          form={form}
          name="team_search"
          layout="horizontal"
          onFinish={handleSearch}
          style={{ marginBottom: 24 }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="teamName" label="团队名称">
                <Input placeholder="搜索团队名称" prefix={<SearchOutlined />} />
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
          dataSource={teamsData}
          pagination={{
            total: teamsData.length,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default TeamList;
