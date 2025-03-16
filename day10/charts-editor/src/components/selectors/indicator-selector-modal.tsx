"use client";

import type React from "react";

import { useState } from "react";
import { Modal, Table, Input, Select, Button, Checkbox } from "antd";
import { SearchOutlined, ThunderboltOutlined } from "@ant-design/icons";
import styles from "../../styles/selectors/indicator-selector-modal.module.scss";

interface IndicatorSelectorModalProps {
  visible: boolean;
  onCancel: () => void;
  onSelect: (indicatorInfo: any) => void;
}

export default function IndicatorSelectorModal({
  visible,
  onCancel,
  onSelect,
}: IndicatorSelectorModalProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns = [
    {
      title: "",
      dataIndex: "selection",
      key: "selection",
      width: 50,
      render: () => <Checkbox />,
    },
    {
      title: "业务类型",
      dataIndex: "businessType",
      key: "businessType",
      width: 120,
    },
    {
      title: "数据来源方式",
      dataIndex: "dataSource",
      key: "dataSource",
      width: 120,
    },
    {
      title: "期间类型",
      dataIndex: "periodType",
      key: "periodType",
      width: 100,
    },
    {
      title: "指标名称",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "指标描述",
      dataIndex: "description",
      key: "description",
      width: 200,
    },
    {
      title: "指标归属",
      dataIndex: "affiliation",
      key: "affiliation",
      width: 200,
    },
    {
      title: "来源系统",
      dataIndex: "sourceSystem",
      key: "sourceSystem",
      width: 120,
    },
    {
      title: "计量单位",
      dataIndex: "unit",
      key: "unit",
      width: 80,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: 80,
    },
  ];

  const data = [
    {
      key: "1",
      businessType: "无线网",
      dataSource: "系统对接",
      periodType: "月",
      name: "4G逻辑基站数",
      description: "4G逻辑基站数",
      affiliation: "省公司、石家庄分公司、邢台分公司...",
      sourceSystem: "综资系统",
      unit: "个",
      status: "启用",
    },
    {
      key: "2",
      businessType: "无线网",
      dataSource: "系统对接",
      periodType: "月",
      name: "5G逻辑基站数",
      description: "5G逻辑基站数",
      affiliation: "省公司、石家庄分公司、邢台分公司...",
      sourceSystem: "综资系统",
      unit: "个",
      status: "启用",
    },
    {
      key: "3",
      businessType: "无线网",
      dataSource: "系统对接",
      periodType: "月",
      name: "逻辑基站数",
      description: "4G、5G逻辑基站数",
      affiliation: "省公司、石家庄分公司、邢台分公司...",
      sourceSystem: "综资系统",
      unit: "个",
      status: "启用",
    },
  ];

  const handleSelect = () => {
    if (selectedRowKeys.length > 0) {
      const selectedIndicator = data.find(
        (item) => item.key === selectedRowKeys[0]
      );
      if (selectedIndicator) {
        onSelect(selectedIndicator);
      }
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <Modal
      title="选择指标"
      open={visible}
      onCancel={onCancel}
      width={1000}
      footer={null}
      className={styles.indicatorSelectorModal}
    >
      <div className={styles.filterBar}>
        <div className={styles.filterItem}>
          <span className={styles.filterLabel}>业务类型</span>
          <Select defaultValue="all" className={styles.filterSelect}>
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value="wireless">无线网</Select.Option>
          </Select>
        </div>
        <div className={styles.filterItem}>
          <span className={styles.filterLabel}>指标名称</span>
          <Input className={styles.filterInput} />
        </div>
        <div className={styles.filterItem}>
          <span className={styles.filterLabel}>期间类型</span>
          <Select defaultValue="all" className={styles.filterSelect}>
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value="month">月</Select.Option>
            <Select.Option value="day">日</Select.Option>
          </Select>
        </div>
        <div className={styles.filterItem}>
          <span className={styles.filterLabel}>状态</span>
          <Select defaultValue="all" className={styles.filterSelect}>
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value="enabled">启用</Select.Option>
            <Select.Option value="disabled">禁用</Select.Option>
          </Select>
        </div>
        <div className={styles.filterButtons}>
          <Button
            type="primary"
            icon={<ThunderboltOutlined />}
            onClick={handleSelect}
          >
            选择
          </Button>
          <Button type="primary" icon={<SearchOutlined />}>
            查询
          </Button>
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          total: 0,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `总共 ${total} 条`,
          pageSize: 50,
          current: 0,
        }}
        scroll={{ x: 1500 }}
      />
    </Modal>
  );
}
