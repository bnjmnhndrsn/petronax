import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { asyncActions as photoAsyncActions } from '../reducers/photos';
import { PHOTO_WIDTH } from './constants';

import './styles/Photo.css';

const mapStateToProps = (state, ownProps) => ({
    photos: state.photos[ownProps.date]
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
            return <div style={{width: `${PHOTO_WIDTH}px`}}>Loading Photo...</div>;
        }

        if (!this.props.photos.length) {
            return <div style={{width: `${PHOTO_WIDTH}px`}}>No Photo</div>;
        }

        const photo = this.props.photos[0];

        return (
            <div className="photo" style={{width: `${PHOTO_WIDTH}px`}}>
                <div className="title">
                    <a href={photo.description_url} target="_blank">
                        {photo.title}
                    </a>
                </div>
                <div className="img-container" style={{backgroundImage: `url(${photo.scaled_url})`}} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
