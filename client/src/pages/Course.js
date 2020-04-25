import React, {Component} from "react";
import {Link} from "react-router-dom";
import useHttp from "../class/useHttpClass";
import {Layout,Carousel, Progress, Row, Col} from 'antd';

import "../pages/style/main.css"
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;

export default class Course extends Component {


    constructor(props) {
        super(props);
        this.httpRequest = new useHttp();
        this.list = this.getItem();
        this.state = {
            list: []
        }
    }



    getItem = async () => {
        await this.httpRequest.request('/api/course/', 'GET', null, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            console.log(result)
            this.setState({
                list: result
            })
        })
    }


    render() {
        return (
            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {/*<table>*/}
                    {/*    <thead>*/}
                    {/*    <tr>*/}
                    {/*        <th>№</th>*/}
                    {/*        <th>Title</th>*/}
                    {/*        <th>Author</th>*/}
                    {/*        <th>Take a course</th>*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}

                    {/*    <tbody>*/}
                    {/*    { this.state.list.map((item, index) => {*/}
                    {/*        return (*/}
                    {/*            <tr key={item._id}>*/}
                    {/*                <td>{index}</td>*/}
                    {/*                <td>{item.title}</td>*/}
                    {/*                <td>{item.userId.email}</td>*/}
                    {/*                <td><Link to={`/course/${item._id}`}>Take a course</Link></td>*/}
                    {/*            </tr>*/}
                    {/*        )*/}
                    {/*    }) }*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                    <div className="course">
                        <Row justify="center">
                            { this.state.list.map((item, index) => {
                                let photoUrl = "https://images.unsplash.com/photo-1566193978446-fa48cfe7579d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
                                if (item.photo !== ''){
                                    photoUrl = "../api/photo/" + item.photo.toString()
                                }
                                return (
                                    <Col className="gutter-row" span={6} style={{padding: '10px'}}>
                                        <div className="course-item">
                                            <img src={photoUrl} alt=""/>
                                            <div className="course-item-content">
                                                <h5 className="course-item-content__title">{item.title}</h5>
                                                <Link to={`/course/${item._id}`} className="course-item-content__button">Take a course</Link>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            }) }
                        </Row>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Maria ©2020</Footer>
            </Layout>
        )
    }
}
