"use client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  Card,
  Steps,
  Divider,
  Space,
  Row,
  Col,
  Breadcrumb,
  Tabs,
  Checkbox,
  Upload,
  message,
  InputNumber,
  Switch,
} from "antd";
import {
  ArrowLeftOutlined,
  UploadOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DashboardOutlined,
  AreaChartOutlined,
  DotChartOutlined,
  RadarChartOutlined,
  FundOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;
const { TabPane } = Tabs;

// 模拟图表预览组件
const ChartPreview = ({ type, data }: { type: string; data: any }) => {
  const style = {
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  };

  const getChartIcon = () => {
    const iconStyle = { fontSize: 64, color: "rgba(0, 0, 0, 0.25)" };

    switch (type) {
      case "bar":
        return <BarChartOutlined style={iconStyle} />;
      case "line":
        return <LineChartOutlined style={iconStyle} />;
      case "area":
        return <AreaChartOutlined style={iconStyle} />;
      case "pie":
        return <PieChartOutlined style={iconStyle} />;
      case "radar":
        return <RadarChartOutlined style={iconStyle} />;
      case "gauge":
        return <DashboardOutlined style={iconStyle} />;
      case "scatter":
        return <DotChartOutlined style={iconStyle} />;
      case "funnel":
        return <FundOutlined style={iconStyle} />;
      default:
        return <BarChartOutlined style={iconStyle} />;
    }
  };

  return <div style={style}>{getChartIcon()}</div>;
};

const ChartCreate = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [chartType, setChartType] = useState("bar");
  const [chartData, setChartData] = useState({});

  // 上传配置
  const uploadProps: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  // 可用的指标列表
  const availableIndicators = [
    { label: "4G连接基站数", value: "station4g" },
    { label: "5G连接基站数", value: "station5g" },
    { label: "连接基站数", value: "stationTotal" },
    { label: "用户数", value: "userCount" },
    { label: "网络覆盖率", value: "coverage" },
    { label: "流量使用量", value: "dataUsage" },
    { label: "业务收入", value: "revenue" },
    { label: "客户满意度", value: "satisfaction" },
  ];

  const steps = [
    {
      title: "基本信息",
      content: (
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            chartType: "bar",
            status: "active",
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="chartName"
                label="图示名称"
                rules={[{ required: true, message: "请输入图示名称" }]}
              >
                <Input placeholder="请输入图示名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="periodType"
                label="数据期间"
                rules={[{ required: true, message: "请选择数据期间" }]}
              >
                <Select placeholder="请选择">
                  <Option value="realtime">实时</Option>
                  <Option value="day">日</Option>
                  <Option value="month">月</Option>
                  <Option value="quarter">季</Option>
                  <Option value="year">年</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="chartDesc" label="图示描述">
            <TextArea rows={4} placeholder="请输入图示描述" />
          </Form.Item>

          <Form.Item
            name="chartType"
            label="图示类型"
            rules={[{ required: true, message: "请选择图示类型" }]}
          >
            <Radio.Group onChange={(e) => setChartType(e.target.value)}>
              <Space direction="vertical">
                <Radio value="bar">
                  <Space>
                    <BarChartOutlined /> 柱状图
                  </Space>
                </Radio>
                <Radio value="line">
                  <Space>
                    <LineChartOutlined /> 曲线图
                  </Space>
                </Radio>
                <Radio value="area">
                  <Space>
                    <AreaChartOutlined /> 面积图
                  </Space>
                </Radio>
                <Radio value="pie">
                  <Space>
                    <PieChartOutlined /> 饼状图
                  </Space>
                </Radio>
                <Radio value="radar">
                  <Space>
                    <RadarChartOutlined /> 雷达图
                  </Space>
                </Radio>
                <Radio value="gauge">
                  <Space>
                    <DashboardOutlined /> 仪表盘
                  </Space>
                </Radio>
                <Radio value="scatter">
                  <Space>
                    <DotChartOutlined /> 散点图
                  </Space>
                </Radio>
                <Radio value="funnel">
                  <Space>
                    <FundOutlined /> 漏斗图
                  </Space>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="viewPermission"
            label="查看权限"
            rules={[{ required: true, message: "请选择查看权限" }]}
          >
            <Select placeholder="请选择">
              <Option value="all">全部</Option>
              <Option value="province">省公司</Option>
              <Option value="city">地市公司</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="状态">
            <Radio.Group>
              <Radio value="active">启用</Radio>
              <Radio value="inactive">停用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "数据配置",
      content: (
        <div>
          <Tabs defaultActiveKey="indicator">
            <TabPane tab="指标数据" key="indicator">
              <Form layout="vertical">
                <Form.Item label="选择数据指标">
                  <Row gutter={[16, 16]}>
                    {availableIndicators.map((indicator) => (
                      <Col span={8} key={indicator.value}>
                        <Checkbox value={indicator.value}>
                          {indicator.label}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Form.Item>

                <Form.Item label="数据维度">
                  <Select placeholder="请选择" style={{ width: "100%" }}>
                    <Option value="time">时间维度</Option>
                    <Option value="area">区域维度</Option>
                    <Option value="business">业务维度</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="时间范围">
                  <Row gutter={8}>
                    <Col span={11}>
                      <Select placeholder="开始时间" style={{ width: "100%" }}>
                        <Option value="2023-01">2023-01</Option>
                        <Option value="2023-02">2023-02</Option>
                        <Option value="2023-03">2023-03</Option>
                      </Select>
                    </Col>
                    <Col span={2} style={{ textAlign: "center" }}>
                      至
                    </Col>
                    <Col span={11}>
                      <Select placeholder="结束时间" style={{ width: "100%" }}>
                        <Option value="2023-10">2023-10</Option>
                        <Option value="2023-11">2023-11</Option>
                        <Option value="2023-12">2023-12</Option>
                      </Select>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="数据过滤">
                  <Card>
                    <p>暂无过滤条件</p>
                  </Card>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="API数据" key="api">
              <Form layout="vertical">
                <Form.Item label="API地址">
                  <Input placeholder="请输入API地址" />
                </Form.Item>

                <Form.Item label="请求方式">
                  <Radio.Group defaultValue="GET">
                    <Radio value="GET">GET</Radio>
                    <Radio value="POST">POST</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="请求参数">
                  <TextArea rows={4} placeholder="请输入请求参数，JSON格式" />
                </Form.Item>

                <Form.Item label="数据刷新频率">
                  <Select placeholder="请选择">
                    <Option value="realtime">实时</Option>
                    <Option value="minute">每分钟</Option>
                    <Option value="hour">每小时</Option>
                    <Option value="day">每天</Option>
                  </Select>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="静态数据" key="static">
              <Form layout="vertical">
                <Form.Item label="上传数据文件">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>
                      上传CSV或Excel文件
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item label="手动输入数据">
                  <TextArea rows={8} placeholder="请输入数据，JSON格式" />
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      ),
    },
    {
      title: "图表样式",
      content: (
        <Row gutter={24}>
          <Col span={16}>
            <Form layout="vertical">
              <Form.Item label="图表标题">
                <Input placeholder="请输入图表标题" />
              </Form.Item>

              <Form.Item label="图表子标题">
                <Input placeholder="请输入图表子标题" />
              </Form.Item>

              <Divider orientation="left">坐标轴设置</Divider>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="X轴标题">
                    <Input placeholder="请输入X轴标题" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Y轴标题">
                    <Input placeholder="请输入Y轴标题" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="显示X轴网格线">
                    <Switch defaultChecked />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="显示Y轴网格线">
                    <Switch defaultChecked />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">图例设置</Divider>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="显示图例">
                    <Switch defaultChecked />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="图例位置">
                    <Select defaultValue="top">
                      <Option value="top">顶部</Option>
                      <Option value="right">右侧</Option>
                      <Option value="bottom">底部</Option>
                      <Option value="left">左侧</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">颜色设置</Divider>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="主题色">
                    <Select defaultValue="default">
                      <Option value="default">默认主题</Option>
                      <Option value="dark">暗色主题</Option>
                      <Option value="light">亮色主题</Option>
                      <Option value="custom">自定义</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="自定义颜色">
                    <Input
                      type="color"
                      defaultValue="#1677ff"
                      style={{ width: 120 }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {chartType === "bar" && (
                <>
                  <Divider orientation="left">柱状图特殊设置</Divider>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="柱子宽度">
                        <InputNumber
                          min={0.1}
                          max={0.9}
                          step={0.1}
                          defaultValue={0.6}
                          style={{ width: 120 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="显示数值标签">
                        <Switch defaultChecked />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              {chartType === "line" && (
                <>
                  <Divider orientation="left">曲线图特殊设置</Divider>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="线条宽度">
                        <InputNumber
                          min={1}
                          max={10}
                          defaultValue={2}
                          style={{ width: 120 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="显示数据点">
                        <Switch defaultChecked />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              {chartType === "pie" && (
                <>
                  <Divider orientation="left">饼图特殊设置</Divider>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="内环半径">
                        <InputNumber
                          min={0}
                          max={0.9}
                          step={0.1}
                          defaultValue={0}
                          style={{ width: 120 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="显示百分比">
                        <Switch defaultChecked />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}
            </Form>
          </Col>
          <Col span={8}>
            <Card title="图表预览">
              <ChartPreview type={chartType} data={chartData} />
            </Card>
          </Col>
        </Row>
      ),
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSave = () => {
    // 保存逻辑
    console.log("表单数据:", form.getFieldsValue());
    console.log("图表类型:", chartType);
    // 保存成功后跳转到列表页
    navigate("/charts");
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link to="/">首页</Link> },
          { title: <Link to="/charts">图示管理</Link> },
          { title: "新增图示" },
        ]}
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: 16 }}
          onClick={() => navigate("/charts")}
        />
        <h1>新增图示</h1>
      </div>

      <Card>
        <Steps current={currentStep} style={{ marginBottom: 24 }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div>{steps[currentStep].content}</div>

        <Divider />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {currentStep > 0 && <Button onClick={prev}>上一步</Button>}
          {currentStep === 0 && (
            <Button onClick={() => navigate("/charts")}>取消</Button>
          )}
          <div>
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                下一步
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={handleSave}>
                保存
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChartCreate;
