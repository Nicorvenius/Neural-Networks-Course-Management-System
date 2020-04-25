import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from './routes'
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Reg from "./components/Reg";

import { Layout } from 'antd';

// import "materialize-css"
import 'antd/es/date-picker/style/css';
import {NotificationContainer, NotificationManager} from "react-notifications";
import 'react-notifications/lib/notifications.css';

const { Header, Content, Footer, Sider } = Layout

export default class App extends Component{

    constructor() {
        super();
        this.storangeName = 'userData';
        this.localStorage = JSON.parse(localStorage.getItem(this.storangeName)) || {token: null, userId: null, isAdmin: null}
        this.state = {
            token: this.localStorage.token,
            userId: this.localStorage.userId,
            isAuthticated: !!this.localStorage.token,
            isAdmin: this.localStorage.isAdmin
        }
    }

    login = (token, userId, isAdmin) => {
        this.setState({
            token: token,
            userId: userId,
            isAdmin: isAdmin,
            isAuthticated: true,
            RegModal: false
        })

        localStorage.setItem(this.storangeName, JSON.stringify({
            userId, token, isAdmin
        }))
    }
    logout = () =>{
        this.setState({
            token: null,
            userId: null,
            isAdmin: null,
            isAuthticated: false,
            AuthModal: false
        })
        this.clearLocalStorage()
    }
    clearLocalStorage(){
        localStorage.setItem(this.storangeName, '[{}]');
    }
    AuthModel =()=>{
        this.setState({
            AuthModal: !this.state.AuthModal
        })
    }
    RegModal =()=>{
        this.setState({
            RegModal: !this.state.RegModal
        })
    }
    onError=(message) => {
        NotificationManager.error(message.toString(), 'Error')
    }
    onSuccess=(message) => {
        NotificationManager.success(message.toString(), 'Success')
    }

    render() {
        const routes = useRoutes(!!this.state.token, {login: this.login, logout:this.logout, token: this.state.token, userId:this.state.userId, isAdmin:this.state.isAdmin});
        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Navbar logout={this.logout} RegModal={this.RegModal} AuthModal={this.AuthModel} isAdmin={this.state.isAdmin} isAuth={this.state.isAuthticated}/>
                    <Auth open={this.state.AuthModal} success={(message)=> this.onSuccess(message)} error={(e)=> this.onError(e)} close={this.AuthModel} login={this.login}></Auth>
                    <Reg open={this.state.RegModal} success={(message)=> this.onSuccess(message)} error={(e)=> this.onError(e)} close={this.RegModal}></Reg>
                    {routes}
                    <NotificationContainer/>
                </Layout>
            </Router>
        );
    }
}
