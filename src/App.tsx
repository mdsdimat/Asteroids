import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PageLayout from '@components/PageLayout';
import PrivateRoute from '@components/PrivateRoute';
import UnauthorizedRoute from '@components/UnauthorizedRoute';

import routes from './routes';

const App: React.FC = () => (
  <PageLayout>
    <Switch>
      <Switch>
        {routes.map(({ type, ...routeProps }) => {
          switch (type) {
            case 'private':
              return <PrivateRoute key={routeProps.path} {...routeProps} />;
            case 'unauthorized':
              return <UnauthorizedRoute key={routeProps.path} {...routeProps} />;

            default:
              return <Route key={routeProps.path} {...routeProps} />;
          }
        })}
      </Switch>
    </Switch>
  </PageLayout>
);

export default App;
