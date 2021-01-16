// Core
import React from 'react';

// Components
import { Table } from 'antd';

// Types
export interface IRequestData {
  ratingFieldName: string,
  cursor: number,
  limit: number,
}

export interface ColumnType {
  key?: number,
  name: string,
  points: number,
  date: string,
  country: string,
}

interface LeaderboardTableProps {
  data: ColumnType[];
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Points',
    dataIndex: 'points',
    sorter: {
      compare: (a: ColumnType, b: ColumnType) => a.points - b.points,
      multiple: 2,
    },
  },
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: {
      compare: (a: ColumnType, b: ColumnType) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      multiple: 1,
    },
  },
  {
    title: 'Country',
    dataIndex: 'country',
  },
];

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => (
  <Table columns={columns} dataSource={data} />
);

// Exports
export default LeaderboardTable;
