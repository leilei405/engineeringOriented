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
  Badge,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FilePdfOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const TemplateList = () => {
  const [form] = Form.useForm();

  // 模拟数据
  const templatesData = [
    {
      key: "1",
      id: 1,
      name: "网络运维月报模板",
      type: "excel",
      category: "报表模板",
      creator: "张三",
      createTime: "2023-01-15",
      updateTime: "2023-05-20",
      downloads: 156,
      status: "已发布",
    },
    {
      key: "2",
      id: 2,
      name: "业务发展季度报告模板",
      type: "word",
      category: "报告模板",
      creator: "李四",
      createTime: "2023-02-20",
      updateTime: "2023-06-15",
      downloads: 89,
      status: "已发布",
    },
    {
      key: "3",
      id: 3,
      name: "客户服务调查问卷模板",
      type: "pdf",
      category: "表单模板",
      creator: "王五",
      createTime: "2023-03-10",
      updateTime: "2023-07-05",
      downloads: 215,
      status: "已发布",
    },
    {
      key: "4",
      id: 4,
      name: "数据分析报告模板",
      type: "word",
      category: "报告模板",
      creator: "赵六",
      createTime: "2023-04-05",
      updateTime: "2023-08-10",
      downloads: 67,
      status: "草稿",
    },
  ];

  // 获取文件类型图标
  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case "excel":
        return <FileExcelOutlined style={{ color: "#217346", fontSize: 20 }} />;
      case "word":
        return <FileWordOutlined style={{ color: "#2b579a", fontSize: 20 }} />;
      case "pdf":
        return <FilePdfOutlined style={{ color: "#f40f02", fontSize: 20 }} />;
      default:
        return <FileTextOutlined style={{ color: "#8c8c8c", fontSize: 20 }} />;
    }
  };

  // 表格列定义
  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "模板名称",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <Space>
          {getFileTypeIcon(record.type)}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category",
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: "创建人",
      dataIndex: "creator",
      key: "creator",
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
      title: "下载次数",
      dataIndex: "downloads",
      key: "downloads",
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
          <Button type="text" icon={<DownloadOutlined />} size="small">
            下载
          </Button>
          <Button type="text" icon={<EyeOutlined />} size="small">
            预览
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
        items={[{ title: "首页" }, { title: "文件模板" }]}
        style={{ marginBottom: 16 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1>文件模板</h1>
        <Space>
          <Button icon={<ExportOutlined />}>导出数据</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link to="/templates/new">新增模板</Link>
          </Button>
        </Space>
      </div>

      <Card>
        <Form
          form={form}
          name="template_search"
          layout="horizontal"
          onFinish={handleSearch}
          style={{ marginBottom: 24 }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="templateName" label="模板名称">
                <Input placeholder="搜索模板名称" prefix={<SearchOutlined />} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="category" label="分类">
                <Select placeholder="全部" allowClear>
                  <Option value="all">全部</Option>
                  <Option value="report">报表模板</Option>
                  <Option value="document">报告模板</Option>
                  <Option value="form">表单模板</Option>
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
          dataSource={templatesData}
          pagination={{
            total: templatesData.length,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default TemplateList;
