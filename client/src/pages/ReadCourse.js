import React, {Component} from "react";
import { withRouter } from "react-router";
import {Link} from "react-router-dom";
import useHttp from "../class/useHttpClass";
import YouTube from 'react-youtube';

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
            console.log(result)
            this.setState({
                data: result,
                isReady: true
            })
        })
    }
    render() {
        const {data} = this.state;

        const opts = {
            height: '780',
            width: '1080',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };

        let photoUrl = "../api/photo/default"
        console.log(this.state.data.photo)
        if (this.state.data.photo !== ''){
            photoUrl = "../api/photo/" + this.state.data.photo
        }

        let dates = (<div></div>);
        if (this.state.isReady === true){
            dates = (
                <div>
                    <div className="banner">
                        <img src={"../api/photo/" + data.banner} alt=""/>
                        <div className="banner-content">
                            <h1 className="banner-content__title">{data.title}</h1>
                            <p className="banner-content__description">{data.description}</p>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section__item">
                            <img src={"../api/photo/" + data.section_image} alt=""/>
                        </div>
                        <div className="section__item">
                            <div className="section__item__content">
                                <div className="Container" dangerouslySetInnerHTML={{__html: data.content}}></div>
                            </div>
                        </div>
                    </div>
                    <h3 className="title-section">Видео</h3>
                    <YouTube videoId={data.videoID} opts={opts} onReady={this._onReady} />
                    <Link to={`/edit/${data._id}`}>Edit</Link>
                </div>
            )
        }
        return dates
    }
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
}
export default withRouter(ReadCourse);
