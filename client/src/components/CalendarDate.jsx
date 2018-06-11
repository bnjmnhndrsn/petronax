import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { asyncActions as photoAsyncActions } from '../reducers/photos';
import { DATE_FORMAT } from '../constants';

import './styles/CalendarDate.css';

const mapStateToProps = (state, ownProps) => ({
    photos: state.photos[ownProps.date]
});

const mapDispatchToProps = {
    fetchPhotos: photoAsyncActions.fetchPhotos
};

export class CalendarDate extends PureComponent {
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

    render(){
        const isLoading = !this.props.photos;
        const hasPhotos = this.props.photos && !!this.props.photos.length;
        return (
            <div className="photo" style={{width: `${this.props.photoWidth}px`}} >
                {
                    hasPhotos && this.props.photos.map(photo => (
                        <div class="photo-item" key={photo.scaled_url}>
                            <div
                                className="img-container"
                                style={{backgroundImage: `url(${photo.scaled_url})`, width: `${this.props.photoWidth - 20}px`}}
                            />
                            <div className="title">
                                <a
                                    rel="noopener noreferrer"
                                    href={photo.description_url}
                                    target="_blank"
                                >
                                    {photo.title}
                                </a>
                            </div>
                        </div>
                    ))
                }
                {
                    isLoading &&
                    <div className="status-text">Loading...</div>
                }
                {
                    !isLoading && !hasPhotos &&
                    <div className="status-text">No Photos</div>
                }
                <div className="date">
                    { moment(this.props.date, DATE_FORMAT).format('D') }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDate);
