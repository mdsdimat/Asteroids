import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import IsAuth from '@helpers/IsAuth';

type UnauthorizedRouteProps = {
  path: string,
  exact: boolean,
  component: React.FC,
}

const UnauthorizedRoute: React.FC<UnauthorizedRouteProps> = (props) => (IsAuth() === false ? <Route {...props} /> : <Redirect to="/" />);

export default UnauthorizedRoute;
