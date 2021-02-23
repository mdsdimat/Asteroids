import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import GamePage from './pages/GamePage/GamePage';
import RegistrationPage from './pages/RegisterPage/RegistrationPage';
import LeaderboardTable from './pages/LeaderboardPage/LeaderboardPage';
import ForumList from './pages/ForumPage/Forum/ForumList';
import ForumPage from './pages/ForumPage/ForumPage';

export default [
  {
    path: '/',
    component: GamePage,
    exact: true,
  },
  {
    path: '/login',
    component: LoginPage,
    exact: true,
  },
  {
    path: '/register',
    component: RegistrationPage,
    exact: true,
  },
  {
    path: '/profile',
    component: ProfilePage,
    exact: true,
  },
  {
    path: '/dashboard',
    component: LeaderboardTable,
    exact: true,
  },
  {
    path: '/forum',
    component: ForumList,
    exact: true,
  },
  {
    path: '/forum-page/:id',
    component: ForumPage,
    exact: true,
  },
];
