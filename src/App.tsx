// Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import PageLayout from "@components/PageLayout";

// Pages
import ProfileForm from './pages/ProfilePage/ProfileForm';
import LoginForm from './pages/LoginPage/LoginForm/LoginForm';
import RegistrationPage from './pages/RegisterPage/RegistrationPage'
import RegistrationForm from './pages/RegisterPage/RegistrationForm/RegistrationForm';
import Leaderboard from './pages/LeaderboardPage/Leaderboard/Leaderboard';
import Game from './pages/GamePage/Game';
import ForumList from './pages/ForumPage/Forum/ForumList';
import ForumPage from './pages/ForumPage/ForumPage';

const App: React.FC = () => (
  <PageLayout>
    <Switch>
      <Route path="/" component={Game} exact />
      <Route path="/login" component={LoginForm} exact />
      <Route path="/register" component={RegistrationPage} exact />
      <Route path="/profile" component={ProfileForm} exact />
      <Route path="/dashboard" component={Leaderboard} exact />
      <Route path="/forum" component={ForumList} exact />
      <Route path="/forum-page/:id" component={ForumPage} exact />
      <Redirect to="/login" />
    </Switch>
  </PageLayout>
);

// Exports
export default App;
