import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import GamePage from './pages/GamePage/GamePage';
import RegistrationPage from './pages/RegisterPage/RegistrationPage';
import LeaderboardTable from './pages/LeaderboardPage/LeaderboardPage';
import ForumPage from './pages/ForumPage/ForumPage';
import FeedbackPage from './pages/FeedbackPage/FeedbackPage';

export default [
  {
    path: '/',
    component: GamePage,
    exact: true,
  },
  {
    path: '/login',
    component: LoginPage,
    type: 'unauthorized',
    exact: true,
  },
  {
    path: '/register',
    component: RegistrationPage,
    type: 'unauthorized',
    exact: true,
  },
  {
    path: '/profile',
    component: ProfilePage,
    type: 'private',
    exact: true,
  },
  {
    path: '/dashboard',
    component: LeaderboardTable,
    exact: true,
  },
  {
    path: '/forum',
    component: ForumPage,
    type: 'private',
    exact: true,
  },
  {
    path: '/feedback',
    component: FeedbackPage,
    exact: true,
  },
];
