"use client";
import type React from "react";
import { useState } from "react";
import { Modal, Table, Input, Select, Button, Checkbox } from "antd";
import { SearchOutlined, ThunderboltOutlined } from "@ant-design/icons";
import styles from "../../styles/selectors/table-selector-modal.module.scss";

interface TableSelectorModalProps {
  visible: boolean;
  onCancel: () => void;
  onSelect: (tableInfo: any) => void;
}

export default function TableSelectorModal({
  visible,
  onCancel,
  onSelect,
}: TableSelectorModalProps) {
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
      title: "业务类别",
      dataIndex: "businessType",
      key: "businessType",
      width: 120,
    },
    {
      title: "期间类型",
      dataIndex: "periodType",
      key: "periodType",
      width: 100,
    },
    {
      title: "表格名称",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "表格描述",
      dataIndex: "description",
      key: "description",
      width: 200,
    },
    {
      title: "创建人",
      dataIndex: "creator",
      key: "creator",
      width: 100,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 120,
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
      periodType: "月",
      name: "话务量月报",
      description: "本地、国际话务量",
      creator: "张XX",
      createTime: "2025-01-01",
      status: "启用",
    },
    {
      key: "2",
      businessType: "无线网",
      periodType: "月",
      name: "数据量月报",
      description: "手机、数据终端流量",
      creator: "张XX",
      createTime: "2025-01-01",
      status: "启用",
    },
  ];

  const handleSelect = () => {
    if (selectedRowKeys.length > 0) {
      const selectedTable = data.find(
        (item) => item.key === selectedRowKeys[0]
      );
      if (selectedTable) {
        onSelect(selectedTable);
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
      title="表格选择"
      open={visible}
      onCancel={onCancel}
      width={1000}
      footer={null}
      className={styles.tableSelectorModal}
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
          <span className={styles.filterLabel}>表格名称</span>
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
          total: 21,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          pageSize: 10,
          current: 1,
        }}
      />
    </Modal>
  );
}
