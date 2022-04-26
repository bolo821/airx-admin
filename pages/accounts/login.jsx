import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '~/store/auth/action';

import { Form, Input, notification } from 'antd';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }
        return false;
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    handleLoginSubmit = e => {
        e.preventDefault();
        let payload = {email: this.state.email, password: this.state.password}
        this.props.dispatch(login(payload));
    };

    handleEmailChange = (e) => {
        e.preventDefault();
        this.setState({email: e.target.value});
    }
    handlePasswordChange = (e) => {
        e.preventDefault();
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="form-account-login-rt"
                        style={{paddingTop: '0px'}}>
                        
                        <div id="sign-in">
                            <div className="ps-form__content">
                                <div style={{textAlign: 'center'}}>
                                    <h2>Welcome to AirX</h2>
                                </div>
                                
                                <div className="form-group">
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Pleaes input your email"
                                            onChange={this.handleEmailChange}
                                            value={this.state.email}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your password!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password..."
                                            onChange={this.handlePasswordChange}
                                            value={this.state.password}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="remember-me"
                                            name="remember-me"
                                        />
                                        <label htmlFor="remember-me">
                                            Rememeber me
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn success ps-btn--fullwidth"
                                        onClick={this.handleLoginSubmit}>
                                        Login
                                    </button>
                                </div>
                            </div>
                            <div className="ps-form__footer" style={{padding: '0'}}>
                                <div style={{textAlign: 'center', marginBottom: '20px'}}>
                                    <Link href="/accounts/register">
                                        <a style={{fontWeight: '900'}}>
                                            DON'T HAVE AN ACCOUNT SIGN UP...
                                        </a>
                                    </Link>
                                </div>
                                <div style={{textAlign: 'center'}}>
                                    <Link href="/">
                                        <a style={{fontWeight: '400'}}>
                                            FORGOT PASSWORD? CLICK TO RESET
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Login);
