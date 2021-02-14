import React from 'react';
/*import { List, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/lib/style/themes/default.less';*/

const data = [
  {
    id: 1,
    title: 'Тема заголовок',
    description: 'Описание первой темы',
  },
  {
    id: 2,
    title: 'Тема заголовок',
    description: 'Описание второй темы',
  },
  {
    id: 3,
    title: 'Тема заголовок',
    description: 'Описание третей темы',
  },
  {
    id: 4,
    title: 'Тема заголовок',
    description: 'Описание четвёртой темы',
  },
];

const ForumList: React.FC = () => <>ForumList</>

/*const ForumList: React.FC = () => (
  <Row>
    <Col span={12} offset={6}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={`/forum-page/${item.id}`}>{item.title}</Link>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Col>
  </Row>
);*/

export default ForumList;
