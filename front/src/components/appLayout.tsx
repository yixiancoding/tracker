import * as React from 'react';
import { Link, Redirect, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components'
import { Action } from 'redux'
import { ThunkDispatch } from "redux-thunk";

import { connect } from 'react-redux';
import { userLogOut, getUserInfo, getUserInvoices } from '../store/actions';
import { capitalizeFirstLetter } from '../helpers/capitalizeFirstLetter'
import { UserActionProps, AppState, LoginState } from '../store/types'

import Dashboard from './dashboard';
import UserInfo from './userInfo';
import UserInvoices from './userInvoices';

const AppContainer = styled.div`
  margin: 20px;
`

const AppHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & a {
      text-decoration: none;
      color: color(black alpha(50%));
  }
`

// const SignUpLink = styled(Link)`
//   text-decoration: none;
//   color: rgba(0, 234, 107,1);
//   border-bottom: 1px solid transparent;
//   &:hover {
//       border-bottom: 1px solid rgba(0, 234, 107,1);
//   }
// `

const LogoImg = styled.img`
  height:50px;
  max-width:50px;
  &:hover {
      max-width: 100px;
  }
  transition: max-width 0.5s ease;
`

const AppContent = styled.div`
  margin: 20px 0; 
`

const AppFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

type StateProps = Pick<LoginState, 'isLoggedIn' | 'extras' | 'match'>

function AppLayout(props: StateProps & UserActionProps) {

  React.useEffect(() => {
    props.getInfo();
    props.getInvoices();
  }, [])

  const url = props.match.url;
  const userName = props.extras && props.extras.userProfileModel ? props.extras.userProfileModel.username : '';
  return props.isLoggedIn ? (
    <BrowserRouter>
      <AppContainer>
        <AppHeader>
          <Link to='/'>
            <LogoImg src="/img/node.svg" />
          </Link>
          <Link to={`${url}`}>Hello {capitalizeFirstLetter(userName)}</Link>
          <Link to={`${url}/invoices`}>My invoices</Link>
          <Link to={`${url}/info`}>Profile</Link>
          <div onClick={e => props.onLogoutClick()}>Logout</div>
        </AppHeader>
        <AppContent>
          <Route path={`${url}/invoices`} component={UserInvoices} />
          <Route path={`${url}/info`} component={UserInfo} />
          <Route exact path={`${url}`} component={Dashboard} />
        </AppContent>
        <AppFooter>

        </AppFooter>
      </AppContainer>
    </BrowserRouter>
  ) :
  (<Redirect to="/"/>);
}

const mapStateToProps = (state: AppState, ownProps: any) => {
    return {
      isLoggedIn: state.loginInfo.isLoggedIn,
      currentURL: ownProps.location.pathname,
      extras: state.loginInfo.extras
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StateProps, void, Action>) => ({
  getInfo: () => dispatch(getUserInfo()),
  getInvoices: () => dispatch(getUserInvoices()),
  onLogoutClick: () => dispatch(userLogOut()),
});
//rather than pass a mapDispatchToProps function to connect,
//we can pass a **configuration object**
// {
//   getInfo: getUserInfo,
//   getInvoices: getUserInvoices,
//   onLogoutClick: userLogOut
// }
//that maps the name of callback function(here is `onLogoutClick`), and the action creator function(`userLogout` in this case)
//N.B.1: that only works with functions has no arguments!!!
// N.B. 2: not working with typescript

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout);