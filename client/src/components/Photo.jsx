import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { asyncActions as photoAsyncActions } from '../reducers/photos';
import { DATE_FORMAT } from '../constants';

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
            this._timeout = setTimeout(() => {
                delete this._timeout;
                this.props.fetchPhotos(this.props.date);
            }, 200);
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.date !== this.props.date && this.props.date){
            this.props.fetchPhotos(this.props.date);
        }
    }

    componentWillUnmount(){
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
    }

    //
    // { isLoading && 'Loading...' }
    // { !isLoading && !photo && 'No Photo.'}

    render(){
        const isLoading = !this.props.photos;
        const photo = this.props.photos && this.props.photos[0];

        return (
            <div className="photo" style={{width: `${this.props.photoWidth}px`}}>
                {
                    !isLoading && photo &&
                    <div
                        className="img-container"
                        style={{backgroundImage: `url(${photo.scaled_url})`, width: `${this.props.photoWidth - 20}px`}}

                    />
                }
                {
                    isLoading &&
                    <div className="status-text">Loading...</div>
                }
                {
                    !isLoading && !photo &&
                    <div className="status-text">No Photo</div>
                }
                <div className="date">
                    { moment(this.props.date, DATE_FORMAT).format('D') }
                </div>
                {
                    photo &&
                    <div className="title">
                        <a href="https://commons.wikimedia.org/wiki/File:Funeral_of_George_Brown_1880.jpg" target="_blank">
                            {photo.title}
                        </a>
                    </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
