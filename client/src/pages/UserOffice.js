import React, {Component} from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import useHttp from "../class/useHttpClass";
import "materialize-css"
import materialaz from 'react-materialize'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class UserOffice extends Component {


    constructor(props) {
        super(props);
        this.httpRequest = new useHttp();
        this.state = {
            userdata: {},
            file:null,
            isReady: false,
        }
        this.fileUpload = this.fileUpload.bind(this)
        this.fileChange = this.fileChange.bind(this)
    }

    componentDidMount() {
        this.getItem();
    }

    fileChange(e){
        console.log(e.target.files[0])
        this.setState({file:e.target.files[0]})
    }

    uploadPhoto= () =>{
        const data = new FormData()
        data.append('file', this.state.file)
        console.log(data)
        console.log(this.state.file)
        this.httpRequest.request(`/api/photo/upload/${this.props.userId}`, 'POST', data, {
            Authorization: `Bearer ${this.props.token}`
        }, true).then((result) => {
            console.log('Upload sucess')
            NotificationManager.success('Success', 'Image success upldate')
        }).catch((e) =>{
            console.log(e)
        })
    }

    fileUpload(e){
        e.preventDefault() // Stop form submit
        this.uploadPhoto()
    }

    getItem = async () => {
        await this.httpRequest.request(`/api/user/${this.props.userId}`, 'GET', null, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            console.log(result)
            this.setState({
                userdata: result,
                isReady: true
            })
        })
    }

    getTable(){
        console.log('push')
        if(this.state.isReady === true){
            let push = this.state.userdata.activeCourse.map((item, index) => {
                return (
                    <tr key={item._id}>
                        <td>{index}</td>
                        <td>{item.title}</td>
                        <td><Link to={`/course/${item._id}`}>Take a course</Link></td>
                    </tr>
                )
            })
            console.log(push.toString())
            return push
        }
    }

    render() {

        let {state} = this.state
        // const email = data.userId.email != 0;
        // const name = data.userId.name != 0;
        let photoUrl = "../api/photo/default"
        console.log(this.state.userdata.photo)
        if (this.state.userdata.photo !== ''){
            photoUrl = "../api/photo/" + this.state.userdata.photo
        }


        return (
            <div>
                <div className="row">
                    <div className="col s2">
                        <div className="user-photo">
                            <img src={photoUrl} style={{width: 200, height: 'auto'}} alt=""/>

                            <form onSubmit={this.fileUpload}>
                                <label htmlFor="">Upload new Photo
                                    <input  style={{display:'block'}} type="file" onChange={this.fileChange} name="file"/>
                                    <button style={{display:'block'}}>Upload</button>
                                </label>
                            </form>
                        </div>
                    </div>
                    <div className="col s10 ">
                       <div className="user-info">
                            <span>Email</span> : <span>{this.state.userdata.email}</span>
                       </div>
                    </div>
                    <div className="col s12 ">
                        <div className="course-list">
                            <span>Course</span>
                            <table>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Title</th>
                                    <th>Take a course</th>
                                </tr>
                                </thead>

                                <tbody>
                                {this.getTable()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        )
    }
}
