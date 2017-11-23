import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { userLogin, resetNotif } from 'store/actions';
import loginPageStyle from './loginPage.css';
import formStyle from '../../../commonStyles/form.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailValid: true,
      pass: '',
    };
    this.changeMail = this.changeMail.bind(this);
    this.changePass = this.changePass.bind(this);
    this.submitData = this.submitData.bind(this);
    this.isEmail = this.isEmail.bind(this);
    this.formValidated = this.formValidated.bind(this);
  }

  //direct router on front-end after success login using react-router
  //see http://stackoverflow.com/a/39608907/6849186
  //moving this part to parent component

  componentDidMount(){
    console.debug("check props", this.props);
    this.props.resetNotif();
  }
  componentWillUnmount() {
    this.props.resetNotif();
  }

  isEmail(value) {
    //test emails
    //see http://stackoverflow.com/a/1373724/6849186
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  formValidated() {
    return !!this.state.email && this.state.emailValid && !!this.state.pass;
  }

  changeMail(e) {
    if (this.isEmail(e.target.value)) {
      this.setState({
        email: e.target.value,
        emailValid: true
      });
    } else {
      this.setState({
        email: e.target.value,
        emailValid: false
      });
    }
  }

  changePass(e) {
    this.setState({
      pass: e.target.value
    });
  }


  submitData() {
    if (this.formValidated()) {
      this.props.onLoginClick(this.state);
    } else {
      console.debug("The login is not correct");
    }
  }


  render() {
    return (
      <div className="signup">
        <div>
          Peek what you've got
                </div>
        <div className={formStyle.input}>
          <input
            className={formStyle.onelineInput}
            type="text"
            value={this.state.email}
            placeholder="your email"
            onChange={this.changeMail}
          />
          <input
            className={formStyle.onelineInput}
            type="password"
            value={this.state.pass}
            placeholder="your password"
            onChange={this.changePass}
          />
        </div>
        <button onClick={this.submitData}>submit!</button>
        {this.props.notif ? <div>{this.props.notif}</div> : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { login } = state;
  return {
    isLoggedIn: login.isLoggedIn,
    // currentURL: ownProps.location.pathname,
    notif: login.notif,
    extras: login.extras
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: (value) => { dispatch(userLogin(value)) },
  resetNotif: () => { dispatch(resetNotif()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);