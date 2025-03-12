"use client";
import { useState } from "react";
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
  Tabs,
  Tag,
  Breadcrumb,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Option } = Select;

const IndicatorList = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("all");

  // 模拟数据
  const indicatorsData = [
    {
      key: "1",
      id: 1,
      type: "第三方原始指标",
      businessType: "无线网",
      dataSource: "系统对接",
      periodType: "月",
      name: "4G连接基站数",
      status: "停用",
    },
    {
      key: "2",
      id: 2,
      type: "第三方原始指标",
      businessType: "无线网",
      dataSource: "系统对接",
      periodType: "月",
      name: "5G连接基站数",
      status: "启用",
    },
    {
      key: "3",
      id: 3,
      type: "组合指标",
      businessType: "无线网",
      dataSource: "公式计算",
      periodType: "月",
      name: "连接基站数",
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
      title: "指标类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "业务类型",
      dataIndex: "businessType",
      key: "businessType",
    },
    {
      title: "数据来源方式",
      dataIndex: "dataSource",
      key: "dataSource",
    },
    {
      title: "期间类型",
      dataIndex: "periodType",
      key: "periodType",
    },
    {
      title: "指标名称",
      dataIndex: "name",
      key: "name",
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
          <Button type="text" icon={<StopOutlined />} size="small">
            失效
          </Button>
          <Button type="text" icon={<EyeOutlined />} size="small">
            查看
          </Button>
          <Button type="text" icon={<EditOutlined />} size="small">
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  // 根据当前选中的标签页过滤数据
  const getFilteredData = () => {
    if (activeTab === "all") {
      return indicatorsData;
    } else if (activeTab === "original") {
      return indicatorsData.filter((item) => item.type === "第三方原始指标");
    } else if (activeTab === "combined") {
      return indicatorsData.filter((item) => item.type === "组合指标");
    }
    return indicatorsData;
  };

  const handleSearch = (values: any) => {
    console.log("搜索条件:", values);
    // 实际应用中这里会调用API进行搜索
  };

  return (
    <div>
      <Breadcrumb
        items={[{ title: "首页" }, { title: "指标管理" }]}
        style={{ marginBottom: 16 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1>指标管理</h1>
        <Space>
          <Button icon={<ExportOutlined />}>导出数据</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link to="/indicators/new">新增指标</Link>
          </Button>
        </Space>
      </div>

      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ marginBottom: 16 }}
        >
          <TabPane tab="全部指标" key="all" />
          <TabPane tab="原始指标" key="original" />
          <TabPane tab="组合指标" key="combined" />
        </Tabs>

        <Form
          form={form}
          name="indicator_search"
          layout="horizontal"
          onFinish={handleSearch}
        >
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item name="indicatorType" label="指标类型">
                <Select placeholder="全部" allowClear>
                  <Option value="all">全部</Option>
                  <Option value="original">第三方原始指标</Option>
                  <Option value="combined">组合指标</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="businessType" label="业务类型">
                <Select placeholder="全部" allowClear>
                  <Option value="all">全部</Option>
                  <Option value="wireless">无线网</Option>
                  <Option value="fixed">固网</Option>
                  <Option value="user">用户</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="dataSource" label="数据来源方式">
                <Select placeholder="全部" allowClear>
                  <Option value="all">全部</Option>
                  <Option value="system">系统对接</Option>
                  <Option value="manual">人工填报</Option>
                  <Option value="formula">公式计算</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="indicatorName" label="指标名称">
                <Input placeholder="搜索指标名称" prefix={<SearchOutlined />} />
              </Form.Item>
            </Col>
            <Col span={4} style={{ display: "flex", alignItems: "flex-end" }}>
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
          dataSource={getFilteredData()}
          pagination={{
            total: getFilteredData().length,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default IndicatorList;
