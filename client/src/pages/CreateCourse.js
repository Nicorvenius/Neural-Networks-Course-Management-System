import React, {Component} from "react";
import useHttp from "../class/useHttpClass";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Editor} from '@tinymce/tinymce-react';
import {Layout} from "antd";


const { Header, Content, Footer, Sider } = Layout;
export default class CreateCourse extends Component {

    constructor() {
        super();
        this.httpRequest = new useHttp();
        this.state = {
            select_value: "",
            title: "",
            content: "",
            photo: "",
            description: '',
            thumbnail: '',

        };
        this.push = this.push.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);

        this.fileChange = this.fileChange.bind(this)
    }

    componentDidMount() {
        // this.getCategory();
    }


    fileChange(e) {
        console.log(e.target.files[0])
        this.setState({file: e.target.files[0]})
    }

    uploadPhoto = () => {
        const data = new FormData()
        data.append('file', this.state.file)
        console.log(data)
        console.log(this.state.file)
        this.httpRequest.request(`/api/course/upload`, 'POST', data, {
            Authorization: `Bearer ${this.props.token}`
        }, true).then((result) => {
            console.log(result)
            this.setState({photo: result.photo})
            NotificationManager.success('Success', 'Image success upload')
            this.coursePublication()
        }).catch((e) => {
            NotificationManager.error(e.message.toString(), 'Error')
        })
    }

    handleChange(event, target) {
        this.setState({[target]: event.target.value})
    }

    handleChangeContent(content, editor) {
        console.log(content)
        this.setState({content: content})
    }

    push(event) {
        this.uploadPhoto()
        event.preventDefault();
    }

    coursePublication = async () => {
        const {title, content} = this.state;
        this.data = this.httpRequest.request('/api/course/create', 'POST', {
            title,
            content,
            userId: this.props.userId,
            photo: this.state.photo
        }, {
            Authorization: `Bearer ${this.props.token}`
        }).then(function (callback) {
            NotificationManager.success('Success', 'Success sourse create')
        }).catch(error => NotificationManager.error(error.toString(), 'Error'))
    }


    render() {
        return (
            <Content style={{margin: '0 16px'}}>
                <form onSubmit={this.push}>
                    <label>Course title:
                        <input type="text" name="name"  onChange={(e) => this.handleChange(e, 'title')}/>
                    </label>
                    <label>Course description:
                        <input type="text" name="name" onChange={(e) => this.handleChange(e, 'description')}/>
                    </label>
                    <label>Section content:
                        {/*<textarea value={this.state.content} onChange={this.handleChangeContent} />*/}
                        <Editor
                            initialValue="<p>This is the initial content of the editor</p>"
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
                    <label>Url to video:
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </label>
                    <label htmlFor="">Upload Course Thumbnail
                        <input style={{display: 'block'}} type="file" onChange={(e) => this.fileChange(e, 'thumbnail')}  name="Thumbnail"/>
                    </label>
                    <label htmlFor="">Upload Course Banner
                        <input style={{display: 'block'}} type="file" onChange={(e) => this.fileChange(e, 'banner')}  name="banner"/>
                    </label>
                    <label htmlFor="">Upload Course section image
                        <input style={{display: 'block'}} type="file" onChange={(e) => this.fileChange(e, 'section_image')} name="section_image"/>
                    </label>
                    <input type="submit" value="Create Course!"/>

                </form>
                <NotificationContainer/>
            </Content>
        )
    }
}
