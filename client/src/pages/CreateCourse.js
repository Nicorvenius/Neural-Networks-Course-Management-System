import React, {Component} from "react";
import useHttp from "../class/useHttpClass";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Editor} from '@tinymce/tinymce-react';
import {Layout} from "antd";


const { Content } = Layout;
export default class CreateCourse extends Component {

    constructor() {
        super();
        this.httpRequest = new useHttp();
        this.state = {
            select_value: "",
            title: "",
            content: "",
            photo: "",
            banner: '',
            description: '',
            thumbnail: '',
            thumbnail_image: '',
            banner_image: '',
            section_image_image: '',
            videoID: '',
        };
        this.push = this.push.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);

        this.fileChange = this.fileChange.bind(this)
    }

    fileChange(e, target) {
        this.setState({[target]: e.target.files[0]})
    }

    uploadPhoto = async (target, key) => {
        const data = new FormData()
        data.append('file', target)
        await this.httpRequest.request(`/api/course/upload`, 'POST', data, {
            Authorization: `Bearer ${this.props.token}`
        }, true).then((result) => {
            this.setState({[key]: result.photo})
            NotificationManager.success('Success', 'Image success upload')
        }).catch((e) => {
            NotificationManager.error(e.message.toString(), 'Error')
        })
    }

    handleChange(event, target) {
        this.setState({[target]: event.target.value})
    }

    handleChangeContent(content, editor) {
        this.setState({content: content})
    }

    push = async (event) => {
        event.preventDefault();
        try{
            await this.uploadPhoto(this.state.thumbnail_image, 'thumbnail')
            await this.uploadPhoto(this.state.banner_image, 'banner');
            await this.uploadPhoto(this.state.section_image_image, 'section_image');
            await this.coursePublication();
        }catch (e) {

        }
    }

    coursePublication = async () => {
        const {title, content, description, thumbnail, section_image, banner, videoID} = this.state;
        this.data = await this.httpRequest.request('/api/course/create', 'POST', {
            title,
            content,
            description,
            photo: thumbnail,
            section_image,
            videoID,
            banner,
            userId: this.props.userId,
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
                    <label>Id Youtube video:
                        <input type="text" name="name" value={this.state.name} onChange={(e) => this.handleChange(e, 'videoID')}/>
                    </label>
                    <label htmlFor="">Upload Course Thumbnail
                        <input style={{display: 'block'}} type="file" onChange={(e) => this.fileChange(e, 'thumbnail_image')}  name="Thumbnail"/>
                    </label>
                    <label htmlFor="">Upload Course Banner
                        <input style={{display: 'block'}} type="file" onChange={(e) => this.fileChange(e, 'banner_image')}  name="banner"/>
                    </label>
                    <label htmlFor="">Upload Course section image
                        <input style={{display: 'block'}} type="file" onChange={(e) => this.fileChange(e, 'section_image_image')} name="section_image"/>
                    </label>
                    <input type="submit" value="Create Course!"/>

                </form>
                <NotificationContainer/>
            </Content>
        )
    }
}
