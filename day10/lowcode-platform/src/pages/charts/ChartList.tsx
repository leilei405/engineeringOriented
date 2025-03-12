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
  Tabs,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TabPane } = Tabs;

const ChartList = () => {
  const [form] = Form.useForm();

  // 模拟数据
  const chartsData = [
    {
      id: 1,
      name: "基站数量柱状图",
      type: "柱状图",
      period: "月度",
      updateTime: "2023-12-01",
      status: "启用",
      icon: (
        <BarChartOutlined
          style={{ fontSize: 48, color: "rgba(0, 0, 0, 0.45)" }}
        />
      ),
    },
    {
      id: 2,
      name: "网络覆盖率仪表盘",
      type: "仪表盘",
      period: "实时",
      updateTime: "2023-11-15",
      status: "启用",
      icon: (
        <DashboardOutlined
          style={{ fontSize: 48, color: "rgba(0, 0, 0, 0.45)" }}
        />
      ),
    },
    {
      id: 3,
      name: "用户分布饼图",
      type: "饼图",
      period: "季度",
      updateTime: "2023-10-30",
      status: "启用",
      icon: (
        <PieChartOutlined
          style={{ fontSize: 48, color: "rgba(0, 0, 0, 0.45)" }}
        />
      ),
    },
    {
      id: 4,
      name: "业务增长趋势图",
      type: "曲线图",
      period: "年度",
      updateTime: "2023-09-15",
      status: "启用",
      icon: (
        <LineChartOutlined
          style={{ fontSize: 48, color: "rgba(0, 0, 0, 0.45)" }}
        />
      ),
    },
  ];

  const handleSearch = (values: any) => {
    console.log("搜索条件:", values);
    // 实际应用中这里会调用API进行搜索
  };

  // 根据当前选中的标签页过滤数据
  const getFilteredCharts = (tabKey: string) => {
    if (tabKey === "all") {
      return chartsData;
    }
    return chartsData.filter((chart) => {
      if (tabKey === "bar") return chart.type === "柱状图";
      if (tabKey === "line") return chart.type === "曲线图";
      if (tabKey === "pie") return chart.type === "饼图";
      if (tabKey === "gauge") return chart.type === "仪表盘";
      return false;
    });
  };

  return (
    <div>
      <Breadcrumb
        items={[{ title: "首页" }, { title: "图示管理" }]}
        style={{ marginBottom: 16 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1>图示管理</h1>
        <Space>
          <Button icon={<ExportOutlined />}>导出数据</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link to="/charts/new">新增图示</Link>
          </Button>
        </Space>
      </div>

      <Tabs defaultActiveKey="all">
        <TabPane tab="全部图示" key="all">
          <ChartListContent charts={getFilteredCharts("all")} />
        </TabPane>
        <TabPane tab="柱状图" key="bar">
          <ChartListContent charts={getFilteredCharts("bar")} />
        </TabPane>
        <TabPane tab="曲线图" key="line">
          <ChartListContent charts={getFilteredCharts("line")} />
        </TabPane>
        <TabPane tab="饼状图" key="pie">
          <ChartListContent charts={getFilteredCharts("pie")} />
        </TabPane>
        <TabPane tab="仪表盘" key="gauge">
          <ChartListContent charts={getFilteredCharts("gauge")} />
        </TabPane>
      </Tabs>
    </div>
  );
};

// 图表列表内容组件
const ChartListContent = ({ charts }: { charts: any[] }) => {
  const [form] = Form.useForm();

  const handleSearchContent = (values: any) => {
    console.log("搜索条件:", values);
    // 实际应用中这里会调用API进行搜索
  };

  return (
    <>
      <Form
        form={form}
        name="chart_search"
        layout="inline"
        onFinish={handleSearchContent}
        style={{ marginBottom: 24 }}
      >
        <Form.Item name="chartName" label="图示名称">
          <Input
            placeholder="搜索图示名称"
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
        {charts.map((chart) => (
          <Col xs={24} sm={12} md={8} key={chart.id}>
            <Card className="chart-card">
              <div className="chart-content">{chart.icon}</div>
              <div className="chart-footer">
                <div>
                  <div style={{ fontWeight: "bold" }}>{chart.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(0, 0, 0, 0.45)" }}>
                    {chart.period} | {chart.type}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(0, 0, 0, 0.45)",
                      marginTop: 4,
                    }}
                  >
                    更新时间: {chart.updateTime}
                  </div>
                </div>
                <Space>
                  <Button size="small" icon={<EyeOutlined />}>
                    预览
                  </Button>
                  <Button size="small" type="primary" icon={<EditOutlined />}>
                    编辑
                  </Button>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ChartList;
