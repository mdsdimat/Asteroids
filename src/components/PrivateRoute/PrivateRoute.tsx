import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import IsAuth from '@helpers/IsAuth';

type PrivateRouteProps = {
  path: string,
  exact: boolean,
  component: React.FC,
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => (IsAuth() === true ? <Route {...props} /> : <Redirect to="/login" />);

export default PrivateRoute;
