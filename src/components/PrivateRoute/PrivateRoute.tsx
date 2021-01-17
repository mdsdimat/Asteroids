import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import IsAuth from '@helpers/IsAuth';

type PrivateRouteProps = {
  auth: boolean,
  path: string,
  exact: boolean,
  component: React.FC,
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ auth, ...props }) => (IsAuth() === auth ? <Route {...props} /> : <Redirect to="/login" />);

export default PrivateRoute;
