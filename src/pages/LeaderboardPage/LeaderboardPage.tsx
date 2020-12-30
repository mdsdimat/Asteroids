// Core
import React from "react";
import {useHistory} from "react-router";

// Types
import LeaderboardTable, {ColumnType} from "./Table/LeaderboardTable";
import {AxiosError} from "axios";

// Api
import LeaderboardApi from "../../api/LeaderboardApi";
import {Col, Row} from "antd";

const LeaderboardPage: React.FC = () => {
  const history = useHistory();

  const [data, setData] = React.useState<ColumnType[]>([]);

  const requestData = {
    ratingFieldName: 'points',
    cursor: 0,
    limit: 10,
  };

  React.useEffect(() => {
    LeaderboardApi.getAllLeaderboard(requestData).then((response) => {
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
        <LeaderboardTable data={data}/>
      </Col>
    </Row>
  )
}

// Exports
export default LeaderboardPage;