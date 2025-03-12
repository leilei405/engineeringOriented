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
  Checkbox,
  Space,
  Row,
  Col,
  Breadcrumb,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

const IndicatorCreate = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "基本信息",
      content: (
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            indicatorType: "original",
            status: "active",
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="indicatorType"
                label="指标类型"
                rules={[{ required: true, message: "请选择指标类型" }]}
              >
                <Select>
                  <Option value="original">第三方原始指标</Option>
                  <Option value="combined">组合指标</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="businessType"
                label="业务类型"
                rules={[{ required: true, message: "请选择业务类型" }]}
              >
                <Select placeholder="请选择">
                  <Option value="wireless">无线网</Option>
                  <Option value="fixed">固网</Option>
                  <Option value="user">用户</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="indicatorName"
                label="指标名称"
                rules={[{ required: true, message: "请输入指标名称" }]}
              >
                <Input placeholder="请输入指标名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="periodType"
                label="期间类型"
                rules={[{ required: true, message: "请选择期间类型" }]}
              >
                <Select placeholder="请选择">
                  <Option value="day">日</Option>
                  <Option value="month">月</Option>
                  <Option value="quarter">季</Option>
                  <Option value="year">年</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="indicatorDesc" label="指标描述">
            <TextArea rows={4} placeholder="请输入指标描述" />
          </Form.Item>

          <Form.Item
            name="indicatorBelong"
            label="指标归属"
            rules={[{ required: true, message: "请选择指标归属" }]}
          >
            <Select placeholder="请选择">
              <Option value="province">省公司及地市公司</Option>
              <Option value="city">仅地市公司</Option>
            </Select>
          </Form.Item>

          <Form.Item name="unit" label="计量单位">
            <Input placeholder="请输入计量单位" />
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
      title: "计算公式",
      content: (
        <div>
          <Form layout="vertical">
            <Form.Item label="选择关联指标">
              <Card>
                <div className="indicator-checkbox-group">
                  <Checkbox>4G连接基站数</Checkbox>
                  <Checkbox>5G连接基站数</Checkbox>
                  <Checkbox>用户数</Checkbox>
                  <Checkbox>网络覆盖率</Checkbox>
                  <Checkbox>流量使用量</Checkbox>
                  <Checkbox>业务收入</Checkbox>
                  <Checkbox>客户满意度</Checkbox>
                </div>
              </Card>
            </Form.Item>

            <Form.Item label="公式编辑器">
              <div className="formula-editor">
                <div className="formula-buttons">
                  <Button>+</Button>
                  <Button>-</Button>
                  <Button>×</Button>
                  <Button>÷</Button>
                  <Button>(</Button>
                  <Button>)</Button>
                </div>
                <TextArea
                  rows={4}
                  placeholder="请输入或构建计算公式"
                  defaultValue="<5G连接基站数> + <4G连接基站数>"
                />
              </div>
            </Form.Item>

            <Form.Item label="公式验证">
              <Card style={{ backgroundColor: "#f5f5f5" }}>
                <p>公式验证通过，可以正常计算。</p>
              </Card>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "数据来源",
      content: (
        <Form layout="vertical">
          <Form.Item
            name="dataSourceType"
            label="数据来源方式"
            rules={[{ required: true, message: "请选择数据来源方式" }]}
          >
            <Select placeholder="请选择">
              <Option value="system">系统对接</Option>
              <Option value="manual">人工填报</Option>
              <Option value="formula">公式计算</Option>
            </Select>
          </Form.Item>

          <Form.Item name="connectedSystem" label="对接系统">
            <Select placeholder="请选择">
              <Option value="oa">OA系统</Option>
              <Option value="erp">ERP系统</Option>
              <Option value="crm">CRM系统</Option>
            </Select>
          </Form.Item>

          <Form.Item name="apiUrl" label="接口地址">
            <Input placeholder="请输入接口地址" />
          </Form.Item>

          <Form.Item label="数据同步时间">
            <Row gutter={16}>
              <Col span={12}>
                <Select placeholder="请选择" style={{ width: "100%" }}>
                  <Option value="daily">每日</Option>
                  <Option value="weekly">每周</Option>
                  <Option value="monthly">每月</Option>
                </Select>
              </Col>
              <Col span={12}>
                <Space>
                  <Input type="number" placeholder="时" style={{ width: 80 }} />
                  <Input type="number" placeholder="分" style={{ width: 80 }} />
                </Space>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Checkbox>同步失败时重新同步</Checkbox>
          </Form.Item>
        </Form>
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
    // 保存成功后跳转到列表页
    navigate("/indicators");
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link to="/">首页</Link> },
          { title: <Link to="/indicators">指标管理</Link> },
          { title: "新增指标" },
        ]}
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: 16 }}
          onClick={() => navigate("/indicators")}
        />
        <h1>新增指标</h1>
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
            <Button onClick={() => navigate("/indicators")}>取消</Button>
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

export default IndicatorCreate;
