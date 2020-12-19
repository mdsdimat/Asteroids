import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

const App: React.FC = () => {
    return (
        <div>
            Hello from Assteroids
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Главная</Link>
                        </li>
                        <li>
                            <Link to="/auth">авторизация</Link>
                        </li>
                        <li>
                            <Link to="/register">регистрация</Link>
                        </li>
                        <li>
                            <Link to="/404">404</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/" exact>Главная она же страница игры</Route>
                    <Route path="/auth">Здесь будет авторизация</Route>
                    <Route path="/register">Здесь будет регистрация</Route>
                    <Route path="/about">О компании</Route>
                    <Route>Здесь будет 404</Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
