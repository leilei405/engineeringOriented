import { Table } from "antd";
import type { ComponentData } from "../../lib/types";
import styles from "../../styles/widgets/table-component.module.scss";

interface TableComponentProps {
  component: ComponentData;
}

export default function TableComponent({ component }: TableComponentProps) {
  // 默认数据
  const defaultColumns = [
    {
      title: "Column 1",
      dataIndex: "column1",
      key: "column1",
    },
    {
      title: "Column 2",
      dataIndex: "column2",
      key: "column2",
    },
    {
      title: "Column 3",
      dataIndex: "column3",
      key: "column3",
    },
  ];

  const defaultDataSource = [
    {
      key: "1",
      column1: "数据1",
      column2: "数据2",
      column3: "数据3",
    },
    {
      key: "2",
      column1: "数据4",
      column2: "数据5",
      column3: "数据6",
    },
    {
      key: "3",
      column1: "数据7",
      column2: "数据8",
      column3: "数据9",
    },
  ];

  const columns = component.data?.columns || defaultColumns;
  const dataSource = component.data?.dataSource || defaultDataSource;

  return (
    <div className={styles.tableComponent}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
        bordered
      />
    </div>
  );
}
