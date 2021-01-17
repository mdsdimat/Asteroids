// Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import PageLayout from '@components/PageLayout';

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
      <Route path="/login" component={LoginPage} exact />
      <Route path="/register" component={RegistrationPage} exact />
      <Route path="/profile" component={ProfilePage} exact />
      <Route path="/dashboard" component={LeaderboardTable} exact />
      <Route path="/forum" component={ForumList} exact />
      <Route path="/forum-page/:id" component={ForumPage} exact />
      <Redirect to="/login" />
    </Switch>
  </PageLayout>
);

// Exports
export default App;
