import React, {Component} from "react";
import { withRouter } from "react-router";
import {Link} from "react-router-dom";
import useHttp from "../class/useHttpClass";

class ReadCourse extends Component {


    constructor(props) {
        super(props);
        this.httpRequest = new useHttp();
        this.state = {
            id: this.props.match.params.id,
            data: {},
            isReady: false,
        }
    }

    componentDidMount() {
        this.getItem();
    }


    getItem = async () => {
        await this.httpRequest.request(`/api/course/${this.state.id}`, 'POST', {userId: this.props.userId}, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            this.setState({
                data: result,
                isReady: true
            })
        })
    }
    render() {
        const {data} = this.state;

        let photoUrl = "../api/photo/default"
        console.log(this.state.data.photo)
        if (this.state.data.photo !== ''){
            photoUrl = "../api/photo/" + this.state.data.photo
        }

        let dates = (<div></div>);
        if (this.state.isReady === true){
            dates = (
                <div>
                    <img src={photoUrl} alt=""/>
                    <h1>{data.title}</h1>
                    <h6>Author: {data.userId.email}</h6>
                    <Link to={`/edit/${data._id}`}>Edit</Link>
                    <div className="Container" dangerouslySetInnerHTML={{__html: data.content}}></div>
                </div>
            )
        }
        return dates
    }
}
export default withRouter(ReadCourse);
