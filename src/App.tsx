import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import ProfileForm from "./components/ProfileForm";
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

const App: React.FC = () => {
    return (
        <div>
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
                    <Route path="/login" component={ProfileForm} />
                    <Route path="/register" component={RegistrationForm} />
                    <Route path="/about">О компании</Route>
                    <Route>Здесь будет 404</Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
