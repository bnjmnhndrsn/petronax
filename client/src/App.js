import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            photo: null,
            isFetching: false,
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
        
        this.setState({
            isFetching: true
        });
        
        const dateString = moment().year(this.state.year).format('YYYY-MM-DD');
        axios.get(`/api/wikipedia?date=${dateString}`)
        .then(({data}) => {
            let newPhoto = null;
            data = data.filter(datum => /(jpg|jpeg|png)$/.test(datum.image_url));
            
            if (data.length) {
                newPhoto = data[Math.floor(Math.random() * data.length)]
            }
            this.setState({photo: newPhoto, isFetching: false});
        });
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
        if (this.state.photo) {
            return (
                <div className="photo">
                    <div className="title">
                        {this.state.photo.title}
                    </div>
                    <div className="img-container">
                        <a href={this.state.photo.description_url} target="_blank">
                            <img alt={this.state.photo.title} src={this.state.photo.scaled_url}/>
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
                    this.state.isFetching ?
                    <div>Loading Photo...</div> :
                    this._renderPhoto()
                }
            </div>
        );
    }
}

export default App;
