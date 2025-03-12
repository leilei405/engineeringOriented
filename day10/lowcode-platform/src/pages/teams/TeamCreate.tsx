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
  Divider,
  Space,
  Row,
  Col,
  Breadcrumb,
  Transfer,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

interface RecordType {
  key: string;
  name: string;
  department: string;
  position: string;
}

const TeamCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  // 模拟用户数据
  const mockUsers: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    name: `用户${i + 1}`,
    department: ["网络部", "业务部", "客服部", "数据部"][i % 4],
    position: ["工程师", "经理", "主管", "专员"][i % 4],
  }));

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
    setSelectedMembers(newTargetKeys);
  };

  const handleSubmit = (values: any) => {
    console.log("表单数据:", values);
    console.log("团队成员:", selectedMembers);

    message.success("团队创建成功");
    navigate("/teams");
  };

  const filterOption = (inputValue: string, option: RecordType) =>
    option.name.indexOf(inputValue) > -1 ||
    option.department.indexOf(inputValue) > -1;

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link to="/">首页</Link> },
          { title: <Link to="/teams">团队管理</Link> },
          { title: "新增团队" },
        ]}
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: 16 }}
          onClick={() => navigate("/teams")}
        />
        <h1>新增团队</h1>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: "active",
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="teamName"
                label="团队名称"
                rules={[{ required: true, message: "请输入团队名称" }]}
              >
                <Input placeholder="请输入团队名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="所属部门"
                rules={[{ required: true, message: "请选择所属部门" }]}
              >
                <Select placeholder="请选择">
                  <Option value="network">网络部</Option>
                  <Option value="business">业务部</Option>
                  <Option value="service">客服部</Option>
                  <Option value="data">数据部</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="leader"
                label="团队负责人"
                rules={[{ required: true, message: "请选择团队负责人" }]}
              >
                <Select placeholder="请选择">
                  {mockUsers.slice(0, 5).map((user) => (
                    <Option key={user.key} value={user.name}>
                      {user.name} - {user.position}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="状态">
                <Radio.Group>
                  <Radio value="active">启用</Radio>
                  <Radio value="inactive">停用</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="团队描述">
            <TextArea rows={4} placeholder="请输入团队描述" />
          </Form.Item>

          <Divider orientation="left">团队成员</Divider>

          <Form.Item label="选择团队成员" required>
            <Transfer
              dataSource={mockUsers}
              titles={["可选用户", "已选用户"]}
              targetKeys={targetKeys}
              onChange={handleChange}
              filterOption={filterOption}
              showSearch
              oneWay
              render={(item) => item.name}
              listStyle={{
                width: 300,
                height: 300,
              }}
            />
          </Form.Item>

          <Divider />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Space>
              <Button onClick={() => navigate("/teams")}>取消</Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default TeamCreate;
