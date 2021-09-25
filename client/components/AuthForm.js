import React, { Component } from 'react'
import {connect} from 'react-redux'
import {authLogin, authSignup} from '../store'

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitType: 'login'
    }
  }

  handleSwitchFields(e, submitType) {
    e.preventDefault();
    this.setState({ submitType: submitType });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.submitType === 'login') {
      const email = e.target.email.value;
      const password = e.target.password.value;
      this.props.authLogin(email, password);
    } else {
      //TODO: validate email isn't duplicate with conditional
      const email = e.target.email.value;
      const password = e.target.password.value;
      const firstName = e.target.firstName.value;
      const lastName = e.target.lastName.value;
      this.props.authSignup(email, password, firstName, lastName);
    }
    this.props.history.push('/home')
  }

  render() {
  const { error } = this.props

    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div>
          <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            {this.state.submitType === 'signup' ? (
              <div>
                <div>
                  <label htmlFor="firstName">
                    <small>First Name</small>
                  </label>
                  <input name="firstName" type="text" />
                </div>
                <div>
                  <label htmlFor="lastName">
                    <small>Last Name</small>
                  </label>
                  <input name="lastName" type="text" />
                </div>
              </div>
            ) : (
              <div />
            )}
            {this.state.submitType === 'login' ? (
                <button type="button" onClick={(e) => this.handleSwitchFields(e, 'signup')}>Sign Up</button>
            ) : (
              <button type="submit" onClick={(e) => this.handleSwitchFields(e, 'login')}>Back To Login</button> 
            )}
            <button type="submit">Submit</button> 

          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({ error: state.auth.error });

const mapDispatch = (dispatch) => ({
    authLogin: (email, password) => dispatch(authLogin(email, password)),
    authSignup: (email, password, firstName, lastName) => dispatch(authSignup(email, password, firstName, lastName)),
});

export default connect(mapState, mapDispatch)(AuthForm);
