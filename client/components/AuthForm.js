import React, { Component } from 'react'
import {connect} from 'react-redux'
import {authLogin, authSignup} from '../store'
import { fetchAllEmails } from "../redux/guestUsers";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitType: 'login',
    }
  }

  componentDidMount() {
    this.props.getEmails();
    this.setState({ submitType: this.props.name })
  }

  handleSwitchFields(e, submitType) {
    e.preventDefault();
    this.setState({ submitType: submitType });
  }

  handleSubmit(e, emails) {
    e.preventDefault();
    if (this.state.submitType === 'signup' &&
      emails.filter(email => email === e.target.email.value)) {
        toast.error('Email already exists.!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      return;
    }
    if (this.state.submitType === 'login') {
      const email = e.target.email.value;
      const password = e.target.password.value;
      this.props.authLogin(email, password);
    } else {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const firstName = e.target.firstName.value;
      const lastName = e.target.lastName.value;
      this.props.authSignup(email, password, firstName, lastName);
    }
    this.props.history.push('/home')
  }

  render() {
  const { error, emails } = this.props

    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e, emails)}>
          <div>
          <label required htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text"/>
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input required name="password" type="password" />
          </div>
          <>
            {this.state.submitType === 'signup' ? (
              <>
                <div>
                  <label required htmlFor="firstName">
                    <small>First Name</small>
                  </label>
                  <input name="firstName" type="text" />
                </div>
                <div>
                  <label required htmlFor="lastName">
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
  error: state.auth.error,
  emails: state.emails
});

const mapSignup = (state) => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.auth.error,
  emails: state.emails
});

const mapDispatch = (dispatch) => ({
  authLogin: (email, password) => dispatch(authLogin(email, password)),
  authSignup: (email, password, firstName, lastName) => dispatch(authSignup(email, password, firstName, lastName)),
  getEmails: () => dispatch(fetchAllEmails())
})

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
