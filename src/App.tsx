// Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import PageLayout from '@components/PageLayout';
import PrivateRoute from '@components/PrivateRoute';

// Pages
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import GamePage from './pages/GamePage/GamePage';
import RegistrationPage from './pages/RegisterPage/RegistrationPage';
import LeaderboardTable from './pages/LeaderboardPage/LeaderboardPage';
import ForumList from './pages/ForumPage/Forum/ForumList';
import ForumPage from './pages/ForumPage/ForumPage';

const App: React.FC = () => (
  <PageLayout>
    <Switch>
      <Route path="/" component={GamePage} exact />
      <PrivateRoute auth={false} path="/login" component={LoginPage} exact />
      <PrivateRoute auth={false} path="/register" component={RegistrationPage} exact />
      <PrivateRoute auth path="/profile" component={ProfilePage} exact />
      <PrivateRoute auth path="/dashboard" component={LeaderboardTable} exact />
      <PrivateRoute auth path="/forum" component={ForumList} exact />
      <PrivateRoute auth path="/forum-page/:id" component={ForumPage} exact />
      <Redirect to="/login" />
    </Switch>
  </PageLayout>
);

// Exports
export default App;
