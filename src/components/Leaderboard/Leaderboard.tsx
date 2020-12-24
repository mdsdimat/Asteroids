import React, { useEffect } from 'react';
import {
  Table, Row, Col,
} from 'antd';

interface ColumnType {
  name: string,
  points: number,
  date: string,
  country: string,
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

const data = [
  {
    key: '1',
    name: 'John Brown',
    points: 60,
    date: '2020-6-8',
    country: 'Russia',
  },
  {
    key: '2',
    name: 'Jim Green',
    points: 66,
    date: '2020-7-8',
    country: 'Russia',
  },
  {
    key: '3',
    name: 'Joe Black',
    points: 90,
    date: '2020-2-8',
    country: 'Chinese',
  },
  {
    key: '4',
    name: 'Jim Red',
    points: 99,
    date: '2020-11-8',
    country: 'Russia',
  },
];

const Leaderboard = (): JSX.Element => {
  const onChange = (...params: unknown[]) => {
    console.log('params', ...params);
  };

  useEffect(() => {
    console.log('api');
  });

  return (
    <Row>
      <Col span={12} offset={6}>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Col>
    </Row>
  );
};
export default Leaderboard;
