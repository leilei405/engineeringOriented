import { Row, Col, Card, Statistic, Tabs, Table, Progress } from "antd";
import {
  AppstoreOutlined,
  TableOutlined,
  AreaChartOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  // 指标类型分布数据
  const indicatorDistributionData = [
    { name: "第三方原始指标", value: 65 },
    { name: "组合指标", value: 35 },
  ];

  // 最近更新的指标数据
  const recentIndicatorsData = [
    {
      key: "1",
      name: "4G连接基站数",
      type: "系统对接 | 月度",
      status: "停用",
    },
    {
      key: "2",
      name: "5G连接基站数",
      type: "系统对接 | 月度",
      status: "启用",
    },
    {
      key: "3",
      name: "连接基站数",
      type: "组合指标 | 月度",
      status: "启用",
    },
  ];

  // 表格列定义
  const columns = [
    {
      title: "指标名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span style={{ color: text === "启用" ? "#52c41a" : "#ff4d4f" }}>
          {text}
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>系统概览</h1>

      {/* 统计卡片 */}
      <Row gutter={16}>
        <Col span={6}>
          <Card className="dashboard-card">
            <Statistic
              title="指标总数"
              value={128}
              prefix={<AppstoreOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: "#52c41a" }}>+12%</span>
              }
              className="dashboard-statistic"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="dashboard-card">
            <Statistic
              title="表格总数"
              value={45}
              prefix={<TableOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: "#52c41a" }}>+8%</span>
              }
              className="dashboard-statistic"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="dashboard-card">
            <Statistic
              title="图示总数"
              value={67}
              prefix={<AreaChartOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: "#52c41a" }}>+15%</span>
              }
              className="dashboard-statistic"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="dashboard-card">
            <Statistic
              title="大屏总数"
              value={12}
              prefix={<DashboardOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: "#52c41a" }}>+5%</span>
              }
              className="dashboard-statistic"
            />
          </Card>
        </Col>
      </Row>

      {/* 内容区域 */}
      <Tabs
        defaultActiveKey="overview"
        items={[
          {
            key: "overview",
            label: "概览",
            children: (
              <Row gutter={16}>
                <Col span={16}>
                  <Card title="最近更新的指标" className="dashboard-card">
                    <Table
                      dataSource={recentIndicatorsData}
                      columns={columns}
                      pagination={false}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="指标类型分布" className="dashboard-card">
                    <div style={{ padding: "20px 0" }}>
                      {indicatorDistributionData.map((item, index) => (
                        <div key={index} style={{ marginBottom: 16 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: 8,
                            }}
                          >
                            <span>{item.name}</span>
                            <span>{item.value}%</span>
                          </div>
                          <Progress
                            percent={item.value}
                            showInfo={false}
                            strokeColor={index === 0 ? "#1677ff" : "#52c41a"}
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
              </Row>
            ),
          },
          {
            key: "indicators",
            label: "指标",
            children: <div>指标详情内容</div>,
          },
          {
            key: "tables",
            label: "表格",
            children: <div>表格详情内容</div>,
          },
          {
            key: "charts",
            label: "图示",
            children: <div>图示详情内容</div>,
          },
          {
            key: "dashboards",
            label: "大屏",
            children: <div>大屏详情内容</div>,
          },
        ]}
      />
    </div>
  );
};

export default Dashboard;
