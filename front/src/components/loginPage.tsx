import * as React from 'react';
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';
import { userLogin, resetNotif } from '../store/actions';
import { AppState, LoginState, LoginReq, LoginActionProps } from '../store/types'
import { InputBlock, OneLineInput } from '../commonStyles/form'
import { useLoginForm } from '../customHooks/useLoginForm'

type StateProps = Pick<LoginState, 'isLoggedIn' | 'notif' | 'extras'>
type DispatchProps = Pick<LoginActionProps, 'onLoginClick' | 'resetNotif'>

type Props = StateProps & DispatchProps

function LoginPage(props: Props) {
  const {
    email,
    pass,
    changeMail,
    changePass,
    loginValid,
  } = useLoginForm(props.resetNotif)

  const submitData = () => {
    if (loginValid) {
      props.onLoginClick({email, pass});
    } else {
      console.debug("The login is not correct");
    }
  }

  return (
    <div className="signup">
      <div>
        Peek what you've got
      </div>
      <InputBlock>
        <OneLineInput
          type="text"
          value={email}
          placeholder="your email"
          onChange={changeMail}
        />
        <OneLineInput
          type="password"
          value={pass}
          placeholder="your password"
          onChange={changePass}
        />
      </InputBlock>
      <button onClick={submitData}>submit!</button>
      {props.notif ? <div>{props.notif}</div> : null}
    </div>
  );
}

const mapStateToProps = ({loginInfo} : AppState): StateProps => {
  const {isLoggedIn, notif, extras} = loginInfo
  return {
    isLoggedIn,
    notif,
    extras
  }
}

// see the type definition of thunk here https://github.com/DefinitelyTyped/DefinitelyTyped/issues/17829
const mapDispatchToProps = (dispatch: ThunkDispatch<StateProps, void, Action>): DispatchProps => ({
  onLoginClick: (value: LoginReq) => { dispatch(userLogin(value)) },
  resetNotif: () => { dispatch(resetNotif()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);