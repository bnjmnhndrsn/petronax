import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { asyncActions as photoAsyncActions } from '../reducers/photos';
import { DATE_FORMAT } from './constants';

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
        const isLoading = !this.props.photos;
        const photo = this.props.photos && this.props.photos[0];

        return (
            <div className="photo" style={{minWidth: `${this.props.photoWidth - 40}px`}}>
                <div className="date">
                    { moment(this.props.date, DATE_FORMAT).format('MMM Do, YYYY') }
                </div>
                <div className="title">
                    { isLoading && 'Loading...' }
                    { !isLoading && !photo && 'No Photo.'}
                    {
                        photo &&
                        <a href={photo.description_url} target="_blank">
                            {photo.title}
                        </a>
                    }
                </div>
                {
                    !isLoading && photo &&
                    <div className="img-container" style={{backgroundImage: `url(${photo.scaled_url})`}} />
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
