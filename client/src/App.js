import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { asyncActions as photoAsyncActions } from './reducers/photos';

import './App.css';

const mapStateToProps = (state) => ({
    photos: state.photos
});

const mapDispatchToProps = {
    fetchPhotos: photoAsyncActions.fetchPhotos
};

class App extends Component {
    constructor(){
        super();
        this.state = {
            year: (Math.floor((Math.random() * 100)) + 1900).toString()
        };
        
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    
    componentDidMount(){
        this.fetchPhoto();
    }
    
    fetchPhoto(){
        if (!this._hasValidYear()) {
            return;
        }
        
        const dateString = this._getDateString();
        this.props.fetchPhotos(dateString);
    }
    
    _getDateString(){
        return moment().year(this.state.year).format('YYYY-MM-DD');
    }
    
    _hasValidYear(){
        const parsed = Number(this.state.year);
        return parsed > 1800 && parsed <= moment().year();
    }
    
    onChange(ev){
        this.setState({year: ev.target.value, showError: false}, () => this.fetchPhoto());
    }
    
    onBlur(){
        if (!this._hasValidYear()) {
            this.setState({showError: true});
        }    
    }
    
    _renderPhoto(){
        const photos = this.props.photos[this._getDateString()];
        if (photos.length) {
            const photo = photos[0];
            
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
            );
        } else {
            return <div>No Photo</div>
        }
    }

    render() {
        return (
            <div className="app">
                <div className="header">
                    <div>
                    On today, { moment().format('MMM Do') }, in <input value={this.state.year} onChange={this.onChange} onBlur={this.onBlur} />
                    </div>
                    <div className="warning">
                    {
                        (!this._hasValidYear() && this.state.showError) ?
                        'Please enter a year between 1800 and now' :
                        ' '
                    }
                    </div>
                </div>

                {
                    this.props.photos[this._getDateString()] ?
                    this._renderPhoto() :
                    <div>Loading Photo...</div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
