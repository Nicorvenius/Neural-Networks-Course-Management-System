import React, {Component} from "react";
import useHttp from "../class/useHttpClass";
import Message from "../class/MessageClass";
import {Link} from "react-router-dom";
import {Layout,Carousel, Progress, Row, Col} from 'antd';

import "../pages/style/main.css"
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;

export default class AuthPage extends Component {

    constructor() {
        super();
        this.httpRequest = new useHttp();
        this.message = new Message();
        this.state = {
            email: '',
            password: '',
            open: false,
            list: [],
        };
        this.data = {};
    }


    componentDidMount() {
        this.getItem();
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
        window.M.updateTextFields();
        return (
            <Content>
                <Carousel>
                    <div className="carousel-father">
                        <img
                            src="/api/photo/carousel_1"
                            alt=""/>
                    </div>
                    <div className="carousel-father">
                        <img
                            src="/api/photo/carousel_2"
                            alt=""/>
                    </div>
                    <div className="carousel-father">
                        <img
                            src="/api/photo/carousel_3"
                            alt=""/>
                    </div>
                    <div className="carousel-father">
                        <img
                            src="/api/photo/carousel_4"
                            alt=""/>
                    </div>
                </Carousel>
                <div className="block-background">
                    <Row justify="center">
                        <Col className="gutter-row" span={20}>
                            <img
                                src="/api/photo/image_2"
                                alt=""/>
                        </Col>
                    </Row>
                </div>
                <div className="block-background">
                    <Row justify="center">
                        <Col className="gutter-row" span={20}>
                            <h3 className="title-section">Правила курса</h3>
                        </Col>

                        <Col className="gutter-row" span={10} style={{margin: '20px'}}>
                            <img src="/api/photo/book" alt="" className="section__image"/>
                            <h5 className="section-item__title">ТЕОРИЯ</h5>
                            <p className="section-item__description">Мы преподаем исключительно тот, материал, который актуален <br/> и поможет разобраться с практическими заданиями.</p>
                        </Col>
                        <Col className="gutter-row" span={10} style={{margin: '20px'}}>
                            <img src="/api/photo/graduation" alt="" className="section__image"/>
                            <h5 className="section-item__title">ПРАКТИКА</h5>
                            <p className="section-item__description">60% всего времени на курсах это практические занятия. <br/> Мы верим в правило трех «П»: практика, практика и еще раз практика.</p>
                        </Col>
                        <Col className="gutter-row" span={10} style={{margin: '20px'}}>
                            <img src="/api/photo/rocket" alt="" className="section__image"/>
                            <h5 className="section-item__title">ЭФФЕКТИВНОЕ ОБУЧЕНИЕ</h5>
                            <p className="section-item__description">Современная информационная индустрия с важными деталями обучения.</p>
                        </Col>
                        <Col className="gutter-row" span={10} style={{margin: '20px'}}>
                            <img src="/api/photo/education" alt="" className="section__image"/>
                            <h5 className="section-item__title">ОТВЕТСТВЕННОСТЬ</h5>
                            <p className="section-item__description">Ваш успех зависит от ваших собственных решений.</p>
                        </Col>
                    </Row>
                </div>
                {/*<div className="block-background">*/}
                {/*    <Row justify="center">*/}
                {/*        <Col className="gutter-row" span={4}>*/}
                {/*            <img*/}
                {/*                src="https://images.unsplash.com/photo-1572294459454-ffe72ebf382a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80"*/}
                {/*                alt=""/>*/}
                {/*        </Col>*/}
                {/*        <Col className="gutter-row" span={12}>*/}
                {/*            <div className="col s8">*/}
                {/*                <div className="block-text">*/}
                {/*                    <h3 className="block-text__title">Textbooks from the Noba Collection.</h3>*/}

                {/*                    <p className="block-text__description">Expertly compiled from Noba modules to fit*/}
                {/*                        the scope and sequence of common courses. Use them as-is or customize them to*/}
                {/*                        fit your needs. Instructor manual, PowerPoint presentations, and test bank*/}
                {/*                        available for many modules.</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</div>*/}
                {/*<div className="block">*/}
                {/*    <Row justify="center">*/}
                {/*        <Col className="gutter-row" span={12}>*/}
                {/*            <div className="block-text">*/}
                {/*                <h3 className="block-text__title">Textbooks from the Noba Collection.</h3>*/}

                {/*                <p className="block-text__description">Expertly compiled from Noba modules to fit the*/}
                {/*                    scope and sequence of common courses. Use them as-is or customize them to fit your*/}
                {/*                    needs. Instructor manual, PowerPoint presentations, and test bank available for many*/}
                {/*                    modules.</p>*/}
                {/*            </div>*/}
                {/*        </Col>*/}
                {/*        <Col className="gutter-row" span={4}>*/}
                {/*            <img*/}
                {/*                src="https://images.unsplash.com/photo-1572294459454-ffe72ebf382a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80"*/}
                {/*                alt=""/>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</div>*/}
                {/*<div className="block">*/}
                {/*    <Row justify="center">*/}
                {/*        <Col className="gutter-row" justify="center" span={2} style={{padding: '10px'}}>*/}
                {/*            <Progress type="circle" percent={75} style={styleJustifyCenter}/>*/}
                {/*            <div className="col s4" style={styleJustifyCenter}>123</div>*/}
                {/*        </Col>*/}
                {/*        <Col className="gutter-row" justify="center" span={2} style={{padding: '10px'}}>*/}
                {/*            <Progress type="circle" percent={70} status="exception" style={styleJustifyCenter}/>*/}
                {/*            <div className="col s4" style={styleJustifyCenter}>123</div>*/}
                {/*        </Col>*/}
                {/*        <Col className="gutter-row" justify="center" span={2} style={{padding: '10px'}}>*/}
                {/*            <Progress type="circle" style={styleJustifyCenter} percent={100}/>*/}
                {/*            <div className="col s4" style={styleJustifyCenter}>123</div>*/}
                {/*        </Col>*/}

                {/*    </Row>*/}
                {/*</div>*/}
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

        )
    }
}

const styleJustifyCenter =  {
    justifyContent: 'center',
    display: 'flex'
}
