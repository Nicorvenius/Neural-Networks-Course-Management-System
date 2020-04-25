import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Layout, Menu} from 'antd';
import {
    UserOutlined,
    UserAddOutlined,
    FileOutlined,
    FileAddOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import "../pages/style/main.css"

const {Header, Sider, Content} = Layout;

export default class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            collapsed: true,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    logoutHendler = event => {
        event.preventDefault()
        this.props.logout()
    }

    AuthModalClick = event => {
        event.preventDefault()
        this.props.AuthModal();
    }

    RegModalClick = event => {
        event.preventDefault()
        this.props.RegModal();
    }

    render() {
        let bar = null;
        if (this.props.isAuth === false) {
            return (
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <a onClick={this.AuthModalClick}>
                                <UserOutlined/>
                                <span>Sigh in</span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <a onClick={this.RegModalClick}>
                                <UserAddOutlined/>
                                <span>Sigh Up</span>
                            </a>
                        </Menu.Item>
                    </Menu>
                </Sider>
            )
        }
        if (this.props.isAdmin === true) {
            return (
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                        <Menu.Item key="1">
                            <NavLink to="/create-course">
                                <FileAddOutlined />
                                <span>Create Course</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to="/course">
                                <FileOutlined />
                                <span>Course</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to="/user">
                                <UserAddOutlined/>
                                <span>User</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <a href="/" onClick={this.logoutHendler}>
                                <LogoutOutlined />
                                <span>Logout</span>
                            </a>
                        </Menu.Item>
                    </Menu>
                </Sider>
            )
        } else {
            return (
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <NavLink to="/course">
                                <FileOutlined />
                                <span>Course</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to="/user">
                                <UserOutlined/>
                                <span>User</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <a href="/" onClick={this.logoutHendler}>
                                <LogoutOutlined />
                                <span>Logout</span>
                            </a>
                        </Menu.Item>
                    </Menu>
                </Sider>

            )
        }
    }

}
