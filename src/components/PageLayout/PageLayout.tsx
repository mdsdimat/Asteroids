import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';

import IsAuth from '@helpers/IsAuth';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const PageLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  let sections;

  if (IsAuth()) {
    sections = [
      { title: 'Играть', url: '/' },
      { title: 'Профиль', url: '/profile' },
      { title: 'Доска почета', url: '/dashboard' },
      { title: 'Форум', url: '/forum' },
    ];
  } else {
    sections = [
      { title: 'Играть', url: '/' },
      { title: 'Вход', url: '/login' },
      { title: 'Регистрация', url: '/register' },
      //временно
      { title: 'Профиль', url: '/profile' },
      { title: 'Форум', url: '/forum' },
      { title: 'Доска почета', url: '/dashboard' },
    ];
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {sections.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              className={classes.toolbarLink}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </Container>

      {children}

    </>
  );
};

// Exports
export default PageLayout;
