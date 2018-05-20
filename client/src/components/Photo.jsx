import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { asyncActions as photoAsyncActions } from '../reducers/photos';

import './styles/Photo.css';

const mapStateToProps = (state) => ({
    date: state.ui.date,
    photos: state.photos[state.ui.date]
});

const mapDispatchToProps = {
    fetchPhotos: photoAsyncActions.fetchPhotos
};

export class Photo extends PureComponent {
    componentDidMount(){
        if (!this.props.photos && this.props.date) {
            this.props.fetchPhotos(this.props.date);
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.date !== this.props.date && this.props.date){
            this.props.fetchPhotos(this.props.date);
        }
    }

    render(){
        if (!this.props.photos) {
            return <div>Loading Photo...</div>;
        }

        if (!this.props.photos.length) {
            return <div>No Photo</div>;
        }

        const photo = this.props.photos[0];

        return (
            <div className="photo">
                <div className="title">
                    {photo.title}
                </div>
                <div className="img-container">
                    <a href={photo.description_url} target="_blank">
                        <img alt={photo.title} src={photo.scaled_url}/>
                    </a>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
