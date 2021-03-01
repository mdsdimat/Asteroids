import React from 'react';

import { DataGrid } from '@material-ui/data-grid';

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
    field: 'id',
    headerName: 'N',
    width: 70,
  },
  {
    field: 'name', sortable: false, headerName: 'Имя игрока', width: 300,
  },
  { field: 'points', headerName: 'Очки', width: 200 },
  { field: 'date', headerName: 'Дата', width: 200 },
];

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }: LeaderboardTableProps) => {
  let i = 1;
  data.forEach(item => {
    item.id = i++;
  });

  return (
    <div style={{ height: 500 }}>
      <DataGrid columns={columns} rows={data} disableColumnMenu hideFooter />
    </div>
  );
};

export default LeaderboardTable;
