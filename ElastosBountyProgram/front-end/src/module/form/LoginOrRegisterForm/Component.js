import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import LoginForm from '@/module/form/LoginForm/Container'
import RegisterForm from '@/module/form/RegisterForm/Container'
import I18N from '@/I18N'
import {Tabs, Row, Col} from 'antd'

import './style.scss'

const TabPane = Tabs.TabPane

export default class extends BaseComponent {
    ord_states() {
        return {
            persist: true,
            activeKey: 'login' // login, register, post
        }
    }

    handleChangeTab() {
        return (key) => {
            this.setState({
                activeKey: key
            })
        }
    }

    handleSubmit() {
        const registerRedirect = sessionStorage.getItem('registerRedirect')
        sessionStorage.removeItem('registerRedirect')
        sessionStorage.removeItem('registerWelcome')
        this.props.onHideModal()
        this.props.history.push('/empower35')
    }

    showPostRegLogScreen() {
        return (
            <div className="post-state">
                <h3 className="welcome-header komu-a">{I18N.get('register.welcome')}</h3>
                <div className="strike-text">
                    <div className="strike-line"/>
                    <p className="welcome-text synthese" onClick={this.handleSubmit.bind(this)}>
                        {I18N.get('register.join_circle')}
                    </p>
                </div>
                <img className="arrow-down" src="/assets/images/emp35/down_arrow.png" />
            </div>
        )
    }

    ord_render() {
        return (
            <Row className="c_LoginOrRegister" type="flex">
                <Col className="side-image">
                    <img src="/assets/images/login-left.png"/>
                </Col>
                <Col className="main-form">
                    {this.state.activeKey === 'post' ? this.showPostRegLogScreen() : (
                        <Tabs activeKey={this.state.activeKey} onChange={this.handleChangeTab()}>
                            <TabPane tab="Login" key="login">
                                <LoginForm />
                            </TabPane>
                            <TabPane tab="Register" key="register">
                                <RegisterForm onChangeActiveKey={this.handleChangeTab()}/>
                            </TabPane>
                        </Tabs>)}
                </Col>
            </Row>
        )
    }
}
