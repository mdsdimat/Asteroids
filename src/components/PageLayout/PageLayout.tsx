import React, { useContext, useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwitchUI from '@material-ui/core/Switch';
import Link from '@material-ui/core/Link';

import { getTheme } from '../../store/actionCreators/theme';

import IsAuth from '@helpers/IsAuth';
import { CustomThemeContext } from '../../CustomThemeProvider';

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

  const isAuth = IsAuth();

  const dispatch = useDispatch();
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    dispatch(getTheme());

    if (currentTheme === 'dark') {
      setIsDark(true);
      setTheme('dark');
    } else {
      setTheme('light');
      setIsDark(false);
    }
  }, [currentTheme]);

  if (isAuth) {
    sections = [
      { title: 'Играть', url: '/' },
      { title: 'Профиль', url: '/profile' },
      { title: 'Доска почета', url: '/dashboard' },
      { title: 'Форум', url: '/forum' },
      { title: 'Обратная связь', url: '/feedback' },
    ];
  } else {
    sections = [
      { title: 'Играть', url: '/' },
      { title: 'Вход', url: '/login' },
      { title: 'Регистрация', url: '/register' },
      { title: 'Обратная связь', url: '/feedback' },
    ];
  }

  const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (checked) {
      setIsDark(true);
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setIsDark(false);
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

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
          <FormControlLabel
            control={<SwitchUI checked={isDark} onChange={handleThemeChange} />}
            label="Сумерки"
          />
        </Toolbar>
      </Container>

      {children}

    </>
  );
};

export default PageLayout;
