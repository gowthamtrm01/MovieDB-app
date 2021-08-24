import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../components/App';
import EditMovieForm from './../components/editMovie';
import Header from '../components/Header';
import NotMatchPage from '../components/NotMatch';

const AppRouter = () => (
    <BrowserRouter>
        <Header></Header>
        <Switch>
            <Route path="/" component={App} exact={true} />
            <Route path="/edit/:id" component={EditMovieForm} exact={true} />
            <Route component={NotMatchPage} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;