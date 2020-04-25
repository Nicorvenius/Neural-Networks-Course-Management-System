import React, {Component} from "react";
import useHttp from "../class/useHttpClass";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Editor} from '@tinymce/tinymce-react';
import {Layout} from "antd";
import {withRouter, Route} from "react-router"


const { Header, Content, Footer, Sider } = Layout;
class EditCourse extends Component {

    constructor() {
        super();
        this.httpRequest = new useHttp();
        this.state = {
            title: "",
            content: "",
            photo: "",
        };
        this.push = this.push.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);

        this.fileChange = this.fileChange.bind(this)
    }

    componentDidMount() {
        this.getItem();
    }


    fileChange(e) {
        console.log(e.target.files[0])
        this.setState({newFile: e.target.files[0]})
    }

    getItem = async () => {
        await this.httpRequest.request(`/api/course/${this.props.match.params.id}`, 'POST', {userId: this.props.userId}, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            console.log(result)
            this.setState({
                title: result.title,
                content: result.content,
                photo: result.photo,
                id: this.props.match.params.id
            })
        })
    }

    uploadPhoto = () => {
        const data = new FormData()
        if (this.state.newFile){
            data.append('file', this.state.newFile)
            let props = this.httpRequest.request(`/api/course/upload`, 'POST', data, {
                Authorization: `Bearer ${this.props.token}`
            }, true).then((result) => {
                console.log(result)
                this.setState({photo: result.photo})
                NotificationManager.success('Success', 'Image success upload')
                this.edit();
            }).catch((e) => {
                NotificationManager.error(e.message.toString(), 'Error')
            })
        }else{
            this.edit();
        }
    }

    edit = async () => {
        const { title, content, photo} = this.state;
        this.data = this.httpRequest.request(`/api/course/edit/${this.state.id}`, 'PUT', {photo: photo, title, content , userId: this.props.userId }, {
            Authorization: `Bearer ${this.props.token}`
        }).then(function () {
            console.log("Success category create")
        }).catch(function (e) {
            alert("Error category create: " + e);
        })
    }

    handleChange(event) {
        this.setState({title: event.target.value})
    }

    handleChangeContent(content, editor) {
        console.log(content)
        this.setState({content: content})
    }

    push(event) {
        this.uploadPhoto()
        event.preventDefault();
    }


    render() {
        return (
            <Content style={{margin: '0 16px'}}>
                <form onSubmit={this.push}>
                    <label>Course title:
                        <input type="text" name="name" value={this.state.title} onChange={this.handleChange}/>
                    </label>
                    <label>Course description:
                        {/*<textarea value={this.state.content} onChange={this.handleChangeContent} />*/}
                        <Editor
                            initialValue={this.state.content}
                            apiKey="rngi2ggdv9xha1jznpwjwoewb6vzadz57oz6w60fikc73mog"
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                    'advlist link image lists'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | image | code | help'
                            }}
                            onEditorChange={this.handleChangeContent}
                        />
                    </label>
                    <label htmlFor="">Upload Course Image
                        <input style={{display: 'block'}} type="file" onChange={this.fileChange} name="file"/>
                    </label>
                    <input type="submit" value="Create Course!"/>
                </form>
                <NotificationContainer/>
            </Content>
        )
    }
}
export default withRouter(EditCourse);
