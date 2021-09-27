import React, { Component } from 'react'
import {connect} from 'react-redux'
import {authLogin, authSignup} from '../store'
import { Link } from "react-router-dom";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitType: 'login'
    }
  }

  componentDidMount() {
    this.setState({ submitType: this.props.name })
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
          <>
            {this.state.submitType === 'signup' ? (
              <>
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
              </>
            ) : (
              <div />
            )}
            {this.state.submitType === 'login' ? (
              <Link className="nav-links" to="/signup">
                <button type="button" onClick={(e) => this.handleSwitchFields(e, 'signup')}>Sign Up</button>
              </Link>
            ) : (
              <Link className="nav-links" to="/login">
                <button type="submit" onClick={(e) => this.handleSwitchFields(e, 'login')}>Back To Login</button> 
              </Link>
            )}
            <button type="submit">Submit</button> 

          </>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
}

const mapLogin = (state) => ({ 
  name: 'login',
  displayName: 'Login',
  error: state.auth.error
});

const mapSignup = (state) => ({ 
  name: 'signup',
  displayName: 'Sign Up',
  error: state.auth.error
});

const mapDispatch = (dispatch) => ({
  authLogin: (email, password) => dispatch(authLogin(email, password)),
  authSignup: (email, password, firstName, lastName) => dispatch(authSignup(email, password, firstName, lastName)),
})

const mapDispatchLogin = (dispatch) => ({
    authLogin: (email, password) => dispatch(authLogin(email, password)),
});

const mapDispatchSignup = (dispatch) => ({
  authSignup: (email, password, firstName, lastName) => dispatch(authSignup(email, password, firstName, lastName)),
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
