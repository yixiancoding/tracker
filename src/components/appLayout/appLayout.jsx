import React from 'react';
import { Link, browserHistory } from 'react-router';
import {connect} from 'react-redux';
import style from './appLayout.css';
import {logout} from '../../store/actions';
import axios from 'axios';
// This imported styles globally without running through CSS Modules
// see https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
import '!style!css!../../commonStyles/reset.css';
import '!style!css!../../commonStyles/font.css';

class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const { dispatch, currentURL } = this.props;

        if (!this.props.isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            //dispatch(setRedirectUrl(currentURL))
            browserHistory.replace("/login")
        }
    }

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }

    logout(){
        axios.post('/api/account/logout',{

        })
            .then((response) =>{
                console.log(response);
                this.props.onLogoutClick();
                this.context.router.push('/');
            })
            .catch((error)=> {
                console.log("error!",error);
            });
    }

    render() {
        const children = this.props.isLoggedIn? this.props.children: <div>please login</div>;
        const mayLogout = this.props.isLoggedIn? <div className={style.signupLink} onClick={this.logout}>Logout</div>:null;
        return (
            <div className={style.appContainer}>
                <header className={style.header}>
                    <Link to="/">
                        <img className={style.logo} src="/img/node.svg"/>
                    </Link>
                    HELLO THERE
                    {mayLogout}
                </header>
                <div className={style.appContent}>
                    {children}
                </div>
                <footer className={style.footer}>

                </footer>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log('inside app',state);
    return {
        isLoggedIn: state.isLoggedIn,
        currentURL: ownProps.location.pathname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: () => {
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppLayout);