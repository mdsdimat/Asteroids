// Core
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import PageLayout from '@components/PageLayout';
import routes from './routes';

const App: React.FC = () => (
  <PageLayout>
    <Switch>
      <Switch>
        {routes.map(({ ...routeProps }) => (
          <Route key={routeProps.path} {...routeProps} />
        ))}
      </Switch>
    </Switch>
  </PageLayout>
);

// Exports
export default App;
