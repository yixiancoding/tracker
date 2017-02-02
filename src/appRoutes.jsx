import React from 'react';
import { Router, browserHistory, IndexRoute, Route} from 'react-router';

import Layout from './components/layout';

import HomeLayout from './components/homepageLayout/homepageLayout';
import IndexPage from './components/indexPage/indexPage';
import SignupPage from './components/signupPage/signupPage';
import LoginPage from './components/loginPage/loginPage';

import AppLayout from './components/appLayout/appLayout';
import Dashboard from './components/dashboard/dashboard';
import UserInfo from './components/userInfo/userInfo';

// good discussion on nested IndexRoute (sort of)
// https://github.com/ReactTraining/react-router/issues/1950#issuecomment-166742102
const routes = (
    <Route path="/" component={Layout}>
        <Route component={HomeLayout}>
            <IndexRoute component={IndexPage}/>
            <Route path="/signup" component={SignupPage}/>
            <Route path="/login" component={LoginPage}/>
            {/*<Route path="invoice/:id" component={InvoicePage}/>*/}
            {/*<Route path="*" component={NotFoundPage}/>*/}
        </Route>
        <Route path="/me" component={AppLayout}>
            <IndexRoute component={Dashboard}/>
            <Route path="/me/info" component={UserInfo}/>
        </Route>
    </Route>
);

class AppRoutes extends React.Component {
    render() {
        return (
            <Router
                history={browserHistory}
                routes={routes}
                onUpdate={() => window.scrollTo(0, 0)}
            />
        );
    }
}

export default AppRoutes;