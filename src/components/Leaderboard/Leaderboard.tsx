import React, { useEffect } from 'react';
import { AxiosError } from 'axios';
import {
  Table, Row, Col,
} from 'antd';
import { useHistory } from 'react-router';
import LeaderboardApi from '../../api/LeaderboardApi';

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

const Leaderboard = (): JSX.Element => {
  const leaderboardApi = new LeaderboardApi();
  const history = useHistory();
  const [data, setData] = React.useState<ColumnType[]>([]);
  const requestData = {
    ratingFieldName: 'points',
    cursor: 0,
    limit: 10,
  };
  const onChange = (...params: unknown[]) => {
    console.log('params', ...params);
  };

  useEffect(() => {
    leaderboardApi.getAllLeaderboard(requestData).then((response) => {
      const newData = response.map((data, index): ColumnType => ({ key: index, ...data.data }));
      setData(newData);
    })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          history.push('/login');
        }
      });
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
